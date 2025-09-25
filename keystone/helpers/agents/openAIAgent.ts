/*
{
  "type": "object",
  "required": [
    "ocrData",
    "prompt"
  ],
  "properties": {
    "ocrData": {
      "type": "string"
    },
    "prompt": {
      "type": "string"
    }
  }
}

## Output Schema

{
  "type": "object",
  "required": [
    "response"
  ],
  "properties": {
    "response": {
      "type": "object"
    }
  }
}

*/
import OpenAI from "openai";
import { config as loadEnv } from "dotenv";
import { agentRunner } from "../agentRunner";

loadEnv({ path: "./common/.env", quiet: true });

export async function runOpenAIAgent(agent, input, context, agentOutputId) {
  try {
    const { OPENAI_API_KEY } = process.env;

    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const executor = async ({ agent, input }): Promise<any> => {
      console.log("Running OpenAI Agent");

      const { ocrData } = input;

      const response = await client.responses.create({
        model: "gpt-5-nano",
        instructions: agent.promptTemplate,
        input: JSON.stringify({ ocrData }),
      });

      console.log(response.output_text);

      return response;
    };

    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
