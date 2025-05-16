import { list } from '@keystone-6/core';
import { text, checkbox, json, select, textarea } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Agent = list({
    access:allowAll,
    fields: {
        name: text({ 
            validation: { isRequired: true } 
        }),
        slug: text({ 
            isIndexed: 'unique', 
            validation: { isRequired: true } 
        }),
        type: select({
            options: [
                { label: 'LLM', value: 'llm' },
                { label: 'Tool', value: 'tool' },
                { label: 'Webhook', value: 'webhook' },
            ],
            validation: { isRequired: true },
        }),
        functionName: text({
            validation: { isRequired: true },
            ui: { description: 'The backend function to call for this agent' },
        }),
        inputSchema: json({
            ui: { description: 'Expected input format (JSON Schema or custom format)' },
        }),
        outputSchema: json({
            ui: { description: 'Expected output format (JSON Schema or custom format)' },
        }),
        promptTemplate: text({
            ui: { displayMode: 'textarea', description: 'Optional LLM prompt template' },
        }),
        enabled: checkbox({ defaultValue: true }),
    },
});