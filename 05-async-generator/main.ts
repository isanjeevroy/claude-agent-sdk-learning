import 'dotenv/config'
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";

async function* generateMessages(): AsyncGenerator<SDKUserMessage> {

    // first message
    yield {
        type: "user",
        message: {
            role: "user",
            content: "Analyze this codebase for security issues"
        },
        parent_tool_use_id: null
    };

    // Wait for conditions or user input
    await new Promise((resolve) => setTimeout(resolve, 2000));

    yield {
        type: "user",
        message: {
            role: "user",
            content: "Also provide me possible fixes in main.fix.ts file with comments"
        },
        parent_tool_use_id: null
    }
}

async function main() {
    for await (const message of query({
        prompt: generateMessages(),
        options: {
            maxTurns: 10,
            allowedTools: ["Read", "Grep", "Write", "Bash"]
        }
    }))

        if (message.type === 'result' && message.subtype === 'success') {
            console.log(message.result);
        }
}

main()