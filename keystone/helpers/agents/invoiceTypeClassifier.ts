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

loadEnv({ path: "./common/.env" });

export async function runInvoiceTypeClassifier({
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

    const executor = async ({ agent, input }): Promise<any> => {
      console.log("Running Invoice Type Classifier Agent");

      const { ocrData } = input;

      const response = await client.responses.create({
        model: "gpt-5-mini",
        reasoning: { effort: "minimal" },
        input: [
          { role: "system", content: agent.promptTemplate },
          { role: "user", content: JSON.stringify({ ocrData }) },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "invoice_direction",
            schema: {
              type: "object",
              additionalProperties: false, // <- REQUIRED
              properties: {
                direction: {
                  type: "string",
                  enum: ["incoming", "outgoing", "unknown"],
                },
                confidence: { type: "number", minimum: 0, maximum: 1 },
                evidence: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false, // <- REQUIRED on nested object
                    properties: {
                      field: {
                        type: "string",
                        enum: [
                          "iban",
                          "vat_id",
                          "org_name",
                          "label",
                          "email",
                          "url",
                        ],
                      },
                      value: { type: "string" },
                      owner_or_role: {
                        type: "string",
                        enum: ["ours", "theirs", "seller", "buyer", "unknown"],
                      },
                      idx: { type: "integer" },
                      why: { type: "string" },
                    },
                    required: ["field", "value", "owner_or_role", "idx", "why"],
                  },
                },
                notes: { type: "string" },
                needs_user_input: { type: ["string", "null"] },
              },
              required: [
                "direction",
                "confidence",
                "evidence",
                "notes",
                "needs_user_input",
              ],
            },
            strict: true,
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
