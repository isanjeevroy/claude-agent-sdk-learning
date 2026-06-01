import 'dotenv/config';
import { query } from "@anthropic-ai/claude-agent-sdk";

const response = query({
    prompt: 'Hey, How are you? My name is Sanjeev Kumar'
})

async function main() {
    for await ( const message of response ){
        
        if(message.type==='result' && message.subtype==='success'){
            console.log(`>` + message.result)
        }

    }
}

main()