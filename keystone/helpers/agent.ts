import {testAgent} from './agents/testAgent'
import {runOcrTesseract} from './agents/tesseractAgent'

export async function runAgent(agent, input, context, agentOutputId) {
    switch (agent.type) {

      case 'tool':
        return runToolAgent(agent, input, context, agentOutputId);

      default:
        throw new Error(`Unsupported agent type: ${agent.type}`);
    }
  }



async function runToolAgent(agent, input, context, agentOutputId) {
    switch(agent.functionName) {
        case "ocrTesseract": 
            return runOcrTesseract(agent, input, context, agentOutputId)
        case "testAgent":
            return testAgent(agent, input, context, agentOutputId)    
        default:
            throw new Error(`Unknown tool agent function: ${agent.function}`);
    }
}








