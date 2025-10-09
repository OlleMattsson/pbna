/*

    Generate entries from invoice 

    - feed invoice and accountChart to LLM
    - outputs double entries

*/

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
}

*/
import OpenAI from "openai";
import { config as loadEnv } from "dotenv";
import { agentRunner } from "../agentRunner";
import schema from "./openAIBankstatementToTransactions-responseSchema.json";

loadEnv({ path: "./common/.env", quiet: true });

export async function openAIBankstatementToTransactions({
  agent,
  input,
  context,
  agentOutputId,
}) {
  try {
    const { OPENAI_API_KEY } = process.env;

    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const executor = async ({ agent, input, context }): Promise<any> => {
      console.log("Running Bank Statement to Transactions Generator ");

      const { rawText } = input;

      const response = await client.responses.create({
        model: "gpt-5-mini",
        reasoning: { effort: "minimal" },
        input: [
          {
            role: "system",
            content: agent.promptTemplate,
          },
          {
            role: "user",
            content: `
            Context

            Raw Bank Statement text that is the result of OCR.

            statementYear = 2023
            language = fi-FI
            raw data =

            ${rawText}
            `,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "transaction-data-extractor",
            strict: true,
            schema,
          },
        },
      });

      response.parsed_output_text = JSON.parse(response.output_text);

      console.log("inference done!");

      return response;
    };

    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
