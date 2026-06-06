# 🚀 Learn Claude Agent SDK

A beginner-friendly repository to learn **Claude Agent SDK** from **basic to advanced** with simple examples.

Whether you're a student, developer, or AI enthusiast, this repository will help you understand how AI agents work and how to build your own AI-powered applications using Claude.

---

# 🎯 Why This Repository?

Many tutorials jump directly into code without explaining the fundamentals.

This repository is different.

Each folder teaches **one concept at a time** with simple examples so you can understand:

* What AI Agents are
* How Agent Loops work
* How Claude thinks and uses tools
* How memory and state work
* How streaming responses work
* How to create custom tools
* How to build real-world AI applications

By the end, you'll understand the core concepts used in:

* Claude Code
* AI Coding Assistants
* Research Agents
* Customer Support Agents
* SaaS AI Products
* Autonomous AI Systems

---

# 📚 What is Claude Agent SDK?

Claude Agent SDK is a toolkit that helps developers build AI agents using Claude.

Instead of only generating text, an agent can:

✅ Read files

✅ Write code

✅ Use tools

✅ Run commands

✅ Search information

✅ Remember context

✅ Complete tasks automatically

### Simple Definition

> Claude Agent SDK lets you build AI assistants that can perform actions, not just answer questions.

---

# 🤔 Claude API vs Claude Agent SDK

### Claude API

```txt
User: Create a React App

Claude:
Here is the code...
```

Claude only generates text.

---

### Claude Agent SDK

```txt
User: Create a React App

Agent:
✓ Creates project
✓ Installs dependencies
✓ Generates code
✓ Runs commands
✓ Fixes errors
✓ Starts application
```

The agent can actually perform actions.

---

# 🛣️ Learning Roadmap

```txt
Hello World
      ↓
Agent Loop
      ↓
Claude Foundation
      ↓
State
      ↓
Async Generator
      ↓
Streaming
      ↓
Structured Output
      ↓
Custom Tools
      ↓
Build Real AI Agents
```

Follow the folders in order.

---

# 01 - Hello World 👋

## What You'll Learn

* Installing Claude Agent SDK
* Making your first request
* Getting a response from Claude

## Why It Matters

Before building agents, you need to understand the basic SDK call.

Think of this as your first "Hello World" program.

## Example

```txt
User:
Hello

Claude:
Hi! How can I help you today?
```

## Outcome

After completing this section, you'll know how to communicate with Claude from code.

---

# 02 - Agent Loop 🔄

## What You'll Learn

* How agents think
* How agents decide what to do next
* Multi-step execution

## Why It Matters

An agent doesn't just answer once.

It repeatedly:

1. Thinks
2. Takes action
3. Observes result
4. Continues until task is finished

## Agent Loop

```txt
Receive Task
      ↓
Think
      ↓
Use Tool
      ↓
Observe Result
      ↓
Think Again
      ↓
Complete Task
```

## Real Example

```txt
User:
Find the latest Node.js version

Agent:
1. Search documentation
2. Read result
3. Return answer
```

---

# 03 - Claude Code Foundation 🏗️

## What You'll Learn

* How Claude Code works
* Tool calling
* Context handling
* Agent architecture

## Why It Matters

Claude Agent SDK uses the same concepts behind Claude Code.

Once you understand these foundations, the rest becomes much easier.

## Real Example

```txt
User:
Fix my React error

Agent:
1. Reads code
2. Finds bug
3. Writes fix
4. Explains solution
```

---

# 04 - State Management 💾

## What You'll Learn

* Memory
* Context
* Session management

## Why It Matters

Without state, the agent forgets everything.

With state, the agent remembers previous interactions.

## Example

```txt
User:
My name is Sanjeev

Agent:
Nice to meet you

User:
What is my name?

Agent:
Your name is Sanjeev
```

---

# 05 - Async Generator ⚡

## What You'll Learn

* Async Generators
* Event Streams
* Real-time updates

## Why It Matters

Modern AI applications don't wait for everything to finish before responding.

They stream data continuously.

## Example

```txt
Event 1
Event 2
Event 3
Event 4
```

Instead of waiting for all events together.

---

# 06 - Streaming Response 🌊

## What You'll Learn

* Token streaming
* Live responses
* Better user experience

## Why It Matters

Users see responses immediately.

## Without Streaming

```txt
Wait 10 seconds...
Full response appears
```

## With Streaming

```txt
Hello
Hello there
Hello there! How can I help?
```

Users receive information instantly.

---

# 07 - Structured Output 📦

## What You'll Learn

* JSON responses
* Output schemas
* Reliable data formats

## Why It Matters

Applications need predictable outputs.

## Example

```json
{
  "name": "Sanjeev",
  "role": "Developer",
  "skills": [
    "JavaScript",
    "Node.js",
    "AI"
  ]
}
```

Perfect for APIs and databases.

---

# 08 - Custom Tools 🛠️

## What You'll Learn

* Tool creation
* Function calling
* API integration

## Why It Matters

Tools give agents superpowers.

Without tools:

```txt
Agent can only talk
```

With tools:

```txt
Agent can:
✓ Search web
✓ Query database
✓ Send emails
✓ Access APIs
✓ Read files
```

## Example

```txt
User:
What's the weather today?

Agent:
Calls Weather Tool
       ↓
Gets Data
       ↓
Returns Answer
```

---

# 🏃 Getting Started

## Step 1: Clone Repository

```bash
git clone https://github.com/your-username/learn-claude-agent-sdk.git
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Start Learning

```bash
cd 01-hello-world
npm start
```

Complete each folder one by one.

---

# 📚 Official Documentation

* 📖 Claude Agent SDK Documentation
  https://code.claude.com/docs/en/agent-sdk

* 🐙 Claude Agent SDK TypeScript GitHub
  https://github.com/anthropics/claude-agent-sdk-typescript

* 🤖 Claude Code Documentation
  https://code.claude.com/docs/en/overview

---

# ⭐ Support

If this repository helps you learn Claude Agent SDK, consider giving it a ⭐ on GitHub.

It helps more developers discover the project.

Happy Learning! 🚀
