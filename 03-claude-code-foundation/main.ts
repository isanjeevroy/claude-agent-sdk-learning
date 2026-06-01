import 'dotenv/config';
import { query } from "@anthropic-ai/claude-agent-sdk";

// https://skill.sh/ => use this for skills, it's made for claude code but we can also use for sdk because having same foundation for claude and agent sdk.

const response = query({
    prompt: 'can you write a hello.ts file and some code into it',
    options: {
        allowedTools: ["Read", "Edit", "Bash", "Write"],
        settingSources: ["user", "project"],
    }
})

async function main() {
    for await ( const message of response ){
        
        if(message.type==='assistant'){
            console.log(`Response`, message.message)

        } else if(message.type==='result' && message.subtype==='success'){
            console.log(`Result`, message.result)
        }
    }
}

main()