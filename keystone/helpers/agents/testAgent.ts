/*
    Simple boilerplate agent

Input schema (not how the input can be either a string or an object)

{
  "type": "object",
  "required": [
    "agentInput"
  ],
  "properties": {
    "agentInput": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "object"
        }
      ]
    }
  }
}

output schema

{
  "type": "object",
  "required": [
    "agentOutput"
  ],
  "properties": {
    "agentOutput": {
      "type": "string"
    }
  }
}

*/

import {agentRunner} from '../agentRunner'

export async function testAgent(agent, input, context, agentOutputId) {

    /*  in this example the executor is synchronous!
        asynchronous agents can use
        const resultPromise = waitForAgentResult(agent.id)
        to capture the result
    */ 
    const executor = (agent, input) => { 
        
        // input is validated and guaranteed
        const {agentInput} = input
        
        console.log("[testAgent] <<<<< BROOO! >>>>>")
        console.log("here's our guaranteed input data", agentInput)

        // output must conform to the output schema
        return {agentOutput: "hello world!"}
    }

    try {
        await agentRunner({agent, input, context, agentOutputId, executor})
    } catch (e) {
        console.log(e)
    }


}