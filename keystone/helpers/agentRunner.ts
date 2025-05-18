/*
    Agent Agnostic runner that validats inputs and outputs

    takes an 
    - executor function which is the meat on the bones business logic
    - an optional onSuccess handler if the default needs to be overridden
*/

import { validateAndStoreErrors } from './validateAndStoreErrors'

export async function agentRunner({
    agent, 
    input, 
    context, 
    agentOutputId, 
    executor, 
    onSuccess = defaultOnSuccess
}) {
    try {
        await validateAndStoreErrors({
            type: "input", 
            value: input, 
            errorPrefix: `[agentRunner] input schema validation failed while running agent ${agent.name}, error stored in OutputAgent ${agentOutputId}`,
            agent, context, agentOutputId
        })
        
        const output = await executor(agent, input)
        
        await validateAndStoreErrors({
            type: "output", 
            value: output, 
            errorPrefix: `[agentRunner] output schema validation failed while running agent ${agent.name}, , error stored in OutputAgent ${agentOutputId}`,
            agent, context, agentOutputId
        })

        await onSuccess(context, agentOutputId, output)

    } catch (err) {
        console.log(err)
    }
}

const defaultOnSuccess = async (context, agentOutputId, output) => 
    context.db.AgentOutput.updateOne({
        where: {id: agentOutputId},
        data: {
            output,
            status: 'completed',
        }
    });
