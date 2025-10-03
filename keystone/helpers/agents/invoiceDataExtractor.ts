/*

    Prototype Invoice data extractor and classify

    Ingests raw OCR data and finds ground truth

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
import schema from "./invoiceDataExtractor-responseSchema.json";

loadEnv({ path: "./common/.env", quiet: true });

export async function runInvoiceDataExtractor({
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

    console.log("runInvoiceDataExtractor", agent, input);

    const executor = async ({ agent, input }): Promise<any> => {
      console.log("Running Invoice Data extractor Agent");

      const { openAIInvoiceTypeClassificationResponse, rawOcrData } = input;

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
Context:
- Locale hint: fi-FI / sv-FI
- Currency hint: EUR

Known truths:
- Invoice direction classification has been approved and verified by user upstreams

${openAIInvoiceTypeClassificationResponse}

OCR_TEXT:
${JSON.stringify({ rawOcrData })}

(optional) KNOWN HINTS (if helpful and non-directional):
- Language hint: {fi/sv/en}
- Expected date formats on doc: {e.g., dd.mm.yyyy}
- Known currency symbols on doc: {€, EUR}

OUTPUT:
Return strictly valid JSON per the schema already attached via response_format.
Do not include any keys that are not in the schema.
If a field is unknown or absent, omit it rather than guessing.
`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "invoice-data-extractor",
            strict: true,
            schema,
          },
        },
      });

      response.parsed_output_text = JSON.parse(response.output_text);

      return response;
    };

    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
