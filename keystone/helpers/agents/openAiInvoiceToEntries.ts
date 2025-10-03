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
import schema from "./openAiInvoiceToEntries-responseSchema.json";

loadEnv({ path: "./common/.env", quiet: true });

export async function openAiInvoiceToEntries({
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
      console.log("Running Invoice to Entries Generator");

      const { direction, invoiceData } = input;

      console.log("direction: ", direction);

      // don't ask how :D
      const ACCOUNTING_PERIOD_ID = "231bc8e2-a0ff-4024-9901-a9ec43b2f46d";

      // retrive accountChart
      const accounts = await context.query.AccountingPeriod.findOne({
        query: `
                accountChart {
                    accounts {
                        account
                        description
                        id
                        name
                        type
                        vatAccount {
                        account
                        description
                        id
                        name
                        type
                        }
                        vatAmount
                    }
                }
            `,
        where: { id: ACCOUNTING_PERIOD_ID },
      });

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
                Task: Produce balanced double-entry lines for the given invoice using ONLY accounts from the Chart of Accounts or "accountCharts".

                The invoice direction is ${direction}. This is a verified fact and must be trusted.

                Steps:
                1) Pick expense/revenue and VAT accounts from accountChart that best match the items/tax.
                2) Create postings that balance.
                3) Include concise "explanations" and per-line "evidence".
                4) Add "warnings" if anything is ambiguous.

                Return JSON that conforms to the provided JSON schema. No extra text.

                InvoiceData:
                ${JSON.stringify(invoiceData)}

                Chart of Accounts / accountChart:
                ${JSON.stringify(accounts)}

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

      console.log("inference done!");

      return response;
    };

    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
