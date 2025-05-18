export async function testAgent(agent, input, context, agentOutputId) {
    console.log("[testAgent] <<<<< BROOO! >>>>>", agent, input)

    await context.db.AgentOutput.updateOne({
        where: {id: agentOutputId},
        data: {
            output: {testAgentId: agent.id},
            status: 'completed',
        }
      });
    return
}