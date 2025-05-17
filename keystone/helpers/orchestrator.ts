import {runAgent} from './agent'
import { KeystoneContext } from '@keystone-6/core/types';

export async function runOrchestrator({  contextMap, context, orchestratorId }:{
    orchestratorId: string,
    contextMap: object,
    context: KeystoneContext
}) {   


    const orchestrator = await context.query.Orchestrator.findOne({
        where: { id: orchestratorId },
        query: `
          id
          name
          steps {
            id
            order
            inputMapping
            storeOutputAs
            agent {
              id
              functionName
              type
              promptTemplate
            }
          }
        `,
      });

      console.log(">>>>>>>>>>", orchestrator)


    if (!orchestrator || orchestrator.steps.length === 0) {
      throw new Error('Orchestrator not found or has no steps.');
    }
  
    const sortedSteps = orchestrator.steps.sort((a, b) => a.order - b.order)
    const firstStep = sortedSteps[0];
  
    console.log(`🔥 Starting orchestrator ${orchestrator.id} at step #${firstStep.order}`);
  
    await runOrchestrationStep(firstStep, contextMap, context);
}  




export async function runOrchestrationStep(step, contextMap, context: KeystoneContext) {
    const agent = step.agent
    const input = interpolate(step.inputMapping, contextMap); // ← inject context vars
  
    /*
    console.log("[runOrchestrationStep]", step.id )
    console.log("[runOrchestrationStep]", contextMap )
    console.log("[runOrchestrationStep] interpolated", input )
*/
        // Create AgentOutput to track the execution
    const agentOutput = await context.db.AgentOutput.createOne({
      data: {
        step: { connect: { id: step.id } },
        agent: { connect: { id: agent.id } },
        input,
        contextSnapshot: contextMap,
        status: 'pending',
      }
    });
  
    // Kick off the agent (dispatch async task)

    runAgent(agent, input, context, agentOutput.id); // ← fire and forget

    return //agentOutput.id;
    
}



  export function interpolate(input: any, context: Record<string, any>): any {
    if (typeof input === 'string') {
      return input.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        const trimmedKey = key.trim();
        const value = context[trimmedKey];
        return value !== undefined ? String(value) : '';
      });
    } else if (Array.isArray(input)) {
      return input.map(i => interpolate(i, context));
    } else if (typeof input === 'object' && input !== null) {
      const result: Record<string, any> = {};
      for (const key in input) {
        result[key] = interpolate(input[key], context);
      }
      return result;
    } else {
      return input;
    }
  }






  export async function __runOrchestrator(orchestrator, { context, input }) {
    let currentInput = input;

  
    for (const step of orchestrator.steps) {

      const agent = await context.db.Agent.findOne({ where: { id: step.agent.id } });
        
      const outputEntry = await context.db.AgentOutput.createOne({
        data: {
          agent: { connect: { id: agent.id } },
          step: { connect: { id: step.id } },
          input: currentInput,
          status: 'pending',
        },
      });
  
      try {
        const result = await runAgent(agent, currentInput);
  
        await context.db.AgentOutput.updateOne({
          where: { id: outputEntry.id },
          data: {
            output: result,
            status: 'completed',
          },
        });
  
        currentInput = result;
      } catch (err) {

        console.log("[runOrchestrator]", e)

        await context.db.AgentOutput.updateOne({
          where: { id: outputEntry.id },
          data: {
            error: { message: err.message },
            status: 'failed',
          },
        });
        break; // Stop the flow if a step fails
      }
    }
  }
