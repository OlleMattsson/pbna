/*
    Boilerplate agent
*/

import { agentRunner } from "../agentRunner";

export async function testAgent({ agent, input, context, agentOutputId }) {
  const executor = async ({ agent, input }) => {
    // input is validated and guaranteed
    const { agentInput } = input;

    // output must conform to the output schema
    return { agentOutput: "hello world!" };
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
