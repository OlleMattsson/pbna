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
    "ocrData",
  ],
  "properties": {
    "ocrData": {
      "type": "object"
    }
  }
}

## Output Schema

{
  "type": "object",
  "required": [
    "llamaOutput"
  ],
  "properties": {
    "llamaOutput": {
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

export async function runLllamaAgent(agent, input, context, agentOutputId) {
  try {
    const executor = async ({ agent, input }): Promise<any> => {
      const { ocrData } = input;

      // set up listener first, needed for async agents
      const resultPromise = waitForAgentResult(agent.id);

      // construct a message for tesseract
      const ocrmsg = new Message();
      ocrmsg
        .setBody({
          ocrData,
        })
        .setTTL(1000 * 60) // in millis
        .setQueue(queueNames.llamaDataExtraction);

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
