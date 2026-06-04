import 'dotenv/config';
import { query } from '@anthropic-ai/claude-agent-sdk';

async function main() {

    const schema = {
        type: "object",
        properties: {
            final_Ans: { type: "number" },
            explanation: { type: "string" },
        },
    };

    for await (const message of query({
        prompt: 'Can you tell me what is 2 + 2',
        options: {
            outputFormat: {
                type: "json_schema",
                schema: schema
            }
        }
    })) {
        if (message.type === 'result' && message.subtype === 'success' && message.structured_output) {
            console.log(message.structured_output);
        }
    }
}

main();