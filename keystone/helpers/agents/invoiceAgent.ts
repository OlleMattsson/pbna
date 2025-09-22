/*
    Test agent

    1) load entire invoice item in first step of the orchestrator
    2) this agent picks out the fields it needs
    3) it looks up the username based on the createdBy id
    4) prints it out for us to enjoy :D

Input schema (not how the input can be either a string or an object)

{
  "type": "object",
  "required": [
    "id",
    "createdBy"
  ],
  "properties": {
    "id": {
      "type": "string"
    },
    "createdBy": {
      "type": "string"
    }
  }
}
output schema

{
  "type": "object",
  "required": [
    "createdByName"
  ],
  "properties": {
    "createdByName": {
      "type": "string"
    }
  }
}

*/

import { agentRunner } from "../agentRunner";

export async function invoiceAgent(agent, input, context, agentOutputId) {
  /*  in this example the executor is synchronous!
        asynchronous agents can use
        const resultPromise = waitForAgentResult(agent.id)
        to capture the result
    */
  const executor = ({ agent, input }) => {
    // input is validated and guaranteed
    const { agentInput } = input;

    console.log("[invoiceAgent] <<<<< BROOO! >>>>>");
    console.log("here's our guaranteed input data", agentInput);

    // output must conform to the output schema
    return { agentOutput: "hello world!" };
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
