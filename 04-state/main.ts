import 'dotenv/config';
import { query } from "@anthropic-ai/claude-agent-sdk";

async function main() {

    let sessionID: string | undefined;

    //query 1
    const response = query({
        prompt: 'My phone number is: +91-9610123658'
    })

    for await (const message of response) {
        if (message.type === 'result' && message.subtype === 'success') {
            sessionID = message.session_id
            console.log(message.result)
        }
    }

    //query 2
    const response2 = query({
        prompt: 'What is my contact number?',
        options: {

            // way-1
            // continue: true

            // way-2
            resume: sessionID
        }
    })

    for await (const message of response2){
        if(message.type==='result' && message.subtype==='success'){
            console.log(message.result)
        }
    }
  
}

main()