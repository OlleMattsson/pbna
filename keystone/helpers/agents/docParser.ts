/*

  DocParser is a microservice that can receive pdfs or images and returns text.
  This tool acts as the glue between the keystone Orchestrator and DocParser.
  
  input schema:

  {
  "type": "object",
  "properties": {
    "file": {
      "type": "string"
    }
  }
}

output schema:

{
  "type": "object",
  "required": [
    "pages",
    "method",
    "combinedText",
    "meta"
  ],
  "properties": {
    "meta": {
      "type": "object",
      "required": [
        "pageCount"
      ],
      "properties": {
        "pageCount": {
          "type": "integer"
        }
      },
      "additionalProperties": true
    },
    "pages": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "page",
          "text"
        ],
        "properties": {
          "page": {
            "type": "integer"
          },
          "text": {
            "type": "string"
          },
          "source": {
            "type": "string"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "method": {
      "type": "string"
    },
    "combinedText": {
      "type": "string"
    }
  },
  "additionalProperties": false
}
*/

import { Message } from "redis-smq";
import { config, queueNames } from "../../common/redis-smq-config";
import { smqRun } from "../smq";
import { waitForAgentResult } from "../waitForAgentResult";
import { agentRunner } from "../agentRunner";

export async function docParser({ agent, input, context, agentOutputId }) {
  try {
    const executor = async ({ agent, input }): Promise<any> => {
      console.log("[DocParser] running", input);

      const { file } = input;

      // this listener handles receiving the result as a pubsub event from docParser
      const resultPromise = waitForAgentResult(agent.id);

      // this is the message we place in docParser redisSMQ queue
      const msg = new Message();
      msg
        .setBody({
          file,
          agentId: agent.id,
        })
        .setTTL(1000 * 60) // in millis
        .setQueue(queueNames.docParser);

      // send work to tesseract queue
      smqRun(msg, config);

      // listener resolves the result
      const result = await resultPromise;

      console.log("[DocParser] done");

      return { ...result };
    };
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
