import {runAgent} from './agent'
import { KeystoneContext } from '@keystone-6/core/types';

/*
    Start an orchestrator by running the first step
*/
export async function runOrchestrator({  contextMap, context, orchestratorId }:{
    orchestratorId: string,
    contextMap: object,
    context: KeystoneContext
}) {   
    const orchestrator = await context.query.Orchestrator.findOne({
        where: { id: orchestratorId },
        query: `
          id
          steps {
            id
            order
            inputMapping
            storeOutputAs
          }
        `,
      });

    if (!orchestrator || orchestrator.steps.length === 0) {
      throw new Error('Orchestrator not found or has no steps.');
    }
  
    const sortedSteps = orchestrator.steps.sort((a, b) => a.order - b.order)
    const firstStep = sortedSteps[0];
  
    console.log(`🔥 Starting orchestrator ${orchestrator.id}`);
  
    await runOrchestrationStep(firstStep.id, contextMap, context);
}  



/*
    Run a step
*/
export async function runOrchestrationStep(stepId, contextMap, context: KeystoneContext) {

    const step = await context.query.OrchestrationStep.findOne({
        where: { id: stepId },
        query: `
            id 
            order 
            storeOutputAs
            inputMapping            
            agent { 
                id 
                type
                functionName
                inputSchema
                outputSchema                  
            }
        `
    });

    const agent = step.agent
    const input = interpolate(step.inputMapping, contextMap); // ← inject context vars

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
  
    runAgent(agent, input, context, agentOutput.id); // ← fire and forget
}


// AI generated dark magig
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