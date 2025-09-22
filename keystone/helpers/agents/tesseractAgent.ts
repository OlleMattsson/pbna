/*

Agent specific logic that defines the executor function which is the actual
business logic, as well as the onSuccess handler which usually writes to DB, 
but could do other things in principle.

The executors inputs and outputs must conform to the graphql
schema specified by the agent.

## Input Schema

{
  "type": "object",
  "required": [
    "imagePath",
    "language"
  ],
  "properties": {
    "language": {
      "enum": [
        "eng",
        "fin",
        "sve"
      ],
      "type": "string"
    },
    "imagePath": {
      "type": "string"
    }
  }
}

## Output Schema

{
  "type": "object",
  "required": [
    "tesseract"
  ],
  "properties": {
    "tesseract": {
      "type": "object"
    }
  }
}

*/

import { Message } from "redis-smq";
import { config, queueNames } from "../../common/redis-smq-config";
import { smqRun } from "../smq";
import { waitForAgentResult } from "../waitForAgentResult";
import { agentRunner } from "../agentRunner";

export async function runOcrTesseract(agent, input, context, agentOutputId) {
  try {
    const executor = async ({ agent, input }): Promise<any> => {
      console.log("runOcrTesseract", input);

      const { language, imagePath } = input;

      // set up listener first, needed for async agents
      const resultPromise = waitForAgentResult(agent.id);

      // construct a message for tesseract
      const ocrmsg = new Message();
      ocrmsg
        .setBody({
          imagePath: imagePath,
          language,
          agentId: agent.id,
        })
        .setTTL(1000 * 60) // in millis
        .setQueue(queueNames.tesseract);

      // send work to tesseract queue
      smqRun(ocrmsg, config);

      // listener resolves the result
      const result = await resultPromise;

      return { tesseract: result };
    };
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
