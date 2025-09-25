/*
    Retrieve and recunstrict context from an agent output
    - contextSnapshot contains the context when the agent was created
    - output is the what the agent itself produced, this is added to the context
      for the next agent in the orchestration

*/

import { agentRunner } from "../agentRunner";

export async function retrieveAgentOutput({
  agent,
  input,
  context,
  agentOutputId,
}) {
  const executor = async ({ agent, input, context }) => {
    // input is validated and guaranteed
    const { agentOutputId } = input;

    const agentOutput = await context.db.AgentOutput.findOne({
      where: { id: agentOutputId },
    });

    const rebuiltContext = {
      ...agentOutput.contextSnapshot,
      previousOutput: agentOutput.output,
    };

    console.log({ ...rebuiltContext });

    return { ...rebuiltContext };
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
