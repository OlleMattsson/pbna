import {validateWithSchema} from './validateWithSchema'

type AgentValidationType = 'input' | 'output';

interface ValidateAndStoreErrorsOptions {
    agent: any;
    value: any;
    context: any;
    agentOutputId: string;
    type: AgentValidationType;
    errorPrefix?: string;
}

export async function validateAndStoreErrors({agent, value, context, agentOutputId, type, errorPrefix = '[AgentRunner] schema validation failed'
}: ValidateAndStoreErrorsOptions): Promise<true> {
    const schema = type === 'input' ? agent.inputSchema : agent.outputSchema;
    const validationErrors = validateWithSchema(schema, value);

    if (validationErrors) {
        // Prepare dynamic update object
        const updateData: any = {
            status: 'failed',
            error: validationErrors,
        };

        if (type === 'input') updateData.failedInput = value;
        if (type === 'output') updateData.failedOutput = value;

        await context.db.AgentOutput.updateOne({
            where: { id: agentOutputId },
            data: updateData
        });

        throw new Error(`${errorPrefix} (${type})`, validationErrors);
    }

    return true;
}