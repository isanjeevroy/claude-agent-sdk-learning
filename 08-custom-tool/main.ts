import 'dotenv/config';
import { query, tool, createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod'

const getWeatherByCityName = tool(
    'get_weather_info',
    'Fetches the current weather information by city name',
    {
        cityName: z.string().describe('name of the city')
    },
    async ({ cityName }) =>{
        const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`
        const response = await fetch(url)
        const parsed = await response.json()

        return {
            content: [ { type: 'text', text: parsed } ]
        }
    }
)

const weatherServer = createSdkMcpServer({
  name: "weather",
  version: "1.0.0",
  tools: [ getWeatherByCityName ]
});

async function main() {

    const schema = {
        type: "object",
        properties: {
            tempInCelsius: { type: "string" },
            tempInFar: { type: "string" },
            condition: { type: "string" },
            suggestion: { type: "string" }
        },
    };

    for await (const message of query({
        prompt: 'What is the temperature of Hyderabad',
        options: {
            outputFormat: {
                type: "json_schema",
                schema: schema
            },
            mcpServers: {
                weather: weatherServer,
            },
            allowedTools: ["mcp__weather__get_weather_info"],
        }
    })) {
        if (message.type === 'result' && message.subtype === 'success') {
            console.log(message.structured_output)
        }
    }
}

main()