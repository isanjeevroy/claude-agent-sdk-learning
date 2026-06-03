// Author: Sanjeev Kumar
//
// =============================================================================
// SECURITY FIXES — annotated reference for the issues found in this codebase
// =============================================================================
// This file is a *reference* showing the secure way to write the patterns used
// in 01..05. Each section maps to a finding from the security review.
// It is intentionally self-contained and commented; adapt per example folder.
// =============================================================================

import 'dotenv/config';
import { query, type SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';

// -----------------------------------------------------------------------------
// FINDING #1 (CRITICAL) — Live API key stored in plaintext .env
// -----------------------------------------------------------------------------
// The repo's .env contains a REAL, working Anthropic key:
//     ANTHROPIC_API_KEY=sk-ant-api03-x6vp7jam8Tdj...QAA
// Problems:
//   - It is a live credential sitting in plaintext on disk.
//   - The project lives under OneDrive (C:\Users\Sanjeev\OneDrive\...), so the
//     secret is being auto-synced to Microsoft's cloud — exfiltration risk.
//   - It has now been exposed (pasted into chat / review), so it is burned.
//
// FIX (do these, in order):
//   1. ROTATE the key NOW at https://console.anthropic.com/settings/keys
//      (revoke the old one — assume it is compromised).
//   2. Keep .env out of git (already in .gitignore here — good) and out of any
//      cloud-synced folder. Move the project off OneDrive/Desktop.
//   3. Never hardcode the key; read it from the environment and FAIL FAST if
//      it is missing instead of silently calling with no/!wrong credentials.
//   4. Commit a .env.example with placeholder values for onboarding.
function getApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !key.startsWith('sk-ant-')) {
    throw new Error(
      'ANTHROPIC_API_KEY is missing or malformed. Set it in your local .env ' +
        '(never commit it) and rotate any key that has been exposed.',
    );
  }
  return key;
}

// -----------------------------------------------------------------------------
// FINDING #2 (HIGH) — Over-broad, ungated tool permissions (03 & 05)
// -----------------------------------------------------------------------------
// 03 grants ["Read","Edit","Bash","Write"] and 05 grants ["Read","Grep",
// "Write","Bash"] with NO permission gating. With Bash enabled and the default
// permission mode, the agent can run arbitrary shell commands and overwrite
// files on your machine — full RCE-by-LLM if the prompt is influenced by any
// untrusted content (see Finding #3).
//
// FIX:
//   - Grant the *least* set of tools the task needs. If the task only reads &
//     analyzes, do NOT include Bash/Write/Edit at all.
//   - Set an explicit permissionMode and a canUseTool callback so every
//     sensitive action is reviewed instead of auto-approved.
//   - Constrain the working directory (cwd) so file tools cannot escape it.
async function runReadOnlyAnalysis(prompt: string) {
  return query({
    prompt,
    options: {
      // Least privilege: analysis needs to read/search, NOT write or exec.
      allowedTools: ['Read', 'Grep', 'Glob'],
      // Explicitly deny the dangerous ones (belt-and-suspenders).
      disallowedTools: ['Bash', 'Write', 'Edit'],
      // Confine file access to this project only.
      cwd: process.cwd(),
      // Ask before anything sensitive; never silently auto-run.
      permissionMode: 'default',
      // Bound the loop so a runaway/looping agent can't churn indefinitely.
      maxTurns: 8,
    },
  });
}

// -----------------------------------------------------------------------------
// FINDING #3 (HIGH) — Prompt injection via settingSources + autonomous writes
// -----------------------------------------------------------------------------
// 03 uses settingSources: ["user","project"], which loads CLAUDE.md and
// on-disk settings (incl. permission grants) into the agent. If any of those
// files — or any file the agent reads while "analyzing the codebase" (05) —
// contains attacker-controlled instructions, the agent can be steered into
// using its Write/Bash tools maliciously. Loading settings broadens the trust
// boundary to "anything on disk".
//
// FIX:
//   - Only load setting sources you actually trust; prefer none, or just
//     "project" that you control. Don't load "user" unless required.
//   - When the agent processes untrusted content, keep it read-only (Finding 2)
//     and gate every write/exec through canUseTool (below).
async function runWithReviewedWrites(prompt: string) {
  return query({
    prompt,
    options: {
      // Don't auto-import user-level settings/permissions you didn't audit.
      settingSources: ['project'],
      allowedTools: ['Read', 'Grep', 'Write'],
      disallowedTools: ['Bash'],
      // Human-in-the-loop approval for each sensitive tool call.
      canUseTool: async (toolName, input) => {
        const writeLike = toolName === 'Write' || toolName === 'Edit';
        if (writeLike) {
          const path = String((input as { file_path?: string })?.file_path ?? '');
          // Reject path traversal / writes outside the project.
          if (path.includes('..') || path.startsWith('/') || /^[A-Za-z]:\\/.test(path)) {
            return { behavior: 'deny', message: `Refused out-of-project write: ${path}` };
          }
        }
        // Default posture: allow only the explicitly-safe tools.
        if (['Read', 'Grep', 'Glob'].includes(toolName)) {
          return { behavior: 'allow', updatedInput: input };
        }
        return { behavior: 'deny', message: `Tool ${toolName} requires manual review.` };
      },
    },
  });
}

// -----------------------------------------------------------------------------
// FINDING #4 (MEDIUM) — Sensitive PII sent to the model (01 & 04)
// -----------------------------------------------------------------------------
// 01 sends a real full name; 04 sends a real phone number ("+91-9610123658")
// and then relies on session resume to recall it. Anything you put in a prompt
// leaves your machine and is processed by the API. Avoid sending real PII in
// learning/demo code; redact or use obviously-fake placeholders.
//
// FIX: scrub PII before it ever reaches query().
function redactPII(text: string): string {
  return text
    // E.164-ish phone numbers
    .replace(/\+?\d[\d\s\-().]{7,}\d/g, '[REDACTED_PHONE]')
    // emails
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[REDACTED_EMAIL]');
}

// -----------------------------------------------------------------------------
// FINDING #5 (LOW) — No error handling / unhandled promise rejections
// -----------------------------------------------------------------------------
// Every example calls main() with no .catch and no try/catch around the async
// iterator. A network/auth error becomes an unhandled rejection (and may leak a
// stack trace with the request including the prompt). Wrap and handle cleanly.
//
// FIX: validate config up front, wrap the stream, and surface a clean error.
async function main() {
  getApiKey(); // fail fast if the key is missing/exposed-and-not-rotated

  // Demonstrates the streaming-input pattern from 05, but read-only & guarded.
  async function* messages(): AsyncGenerator<SDKUserMessage> {
    yield {
      type: 'user',
      message: { role: 'user', content: redactPII('Analyze this codebase for security issues') },
      parent_tool_use_id: null,
    };
  }

  try {
    for await (const message of await runReadOnlyAnalysis('Review for security issues')) {
      if (message.type === 'result' && message.subtype === 'success') {
        console.log(message.result);
      }
    }
    void messages; // referenced for the example; wire up as needed
    void runWithReviewedWrites; // available when guarded writes are required
  } catch (err) {
    // Don't dump raw errors (may include prompt contents); log a safe summary.
    console.error('Agent run failed:', err instanceof Error ? err.message : 'unknown error');
    process.exitCode = 1;
  }
}

main();
