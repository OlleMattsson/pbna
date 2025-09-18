import {testAgent} from './agents/testAgent'
import {runOcrTesseract} from './agents/tesseractAgent'
import {runLllamaAgent} from './agents/llamaAgent'
import {runOpenAIAgent} from './agents/openAIAgent'

export async function runAgent(agent, input, context, agentOutputId) {
    switch (agent.type) {

      case 'tool':
        return runToolAgent(agent, input, context, agentOutputId);

      case "llm":
        return runLlmAgent(agent, input, context, agentOutputId)

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

async function runLlmAgent(agent, input, context, agentOutputId) {
    switch(agent.functionName) {
        case "llamaAgent": 
            return runLllamaAgent(agent, input, context, agentOutputId)
        case "openAIAgent": 
            return runOpenAIAgent(agent, input, context, agentOutputId)
        default:
            throw new Error(`Unknown tool agent function: ${agent.function}`);
    }
}
