import 'dotenv/config';
import { query } from "@anthropic-ai/claude-agent-sdk";

const response = query({
    prompt: 'Tell me a long indian love story',
    options: {
        includePartialMessages: true,
    }
})

async function main() {
    for await (const message of response) {

        if (message.type === "stream_event") {
            const event = message.event;
            if (event.type === "content_block_delta") {
                if (event.delta.type === "text_delta") {
                    process.stdout.write(event.delta.text);
                }
            }
        }
    }
}

main()