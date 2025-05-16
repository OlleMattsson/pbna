import {runAgent} from './agent'

export async function runOrchestrator(orchestrator, { context, input }) {
    let currentInput = input;

  
    for (const step of orchestrator.steps) {

        console.log("step", step)

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