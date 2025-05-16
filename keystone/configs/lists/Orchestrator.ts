import { list } from '@keystone-6/core';
import { text, select, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';


export const Orchestrator = list({
    access: allowAll,
    fields: {
        name: text({ validation: { isRequired: true } }),
        triggerEvent: select({
            options: [
                { label: 'Attachment OCR', value: 'attachment.ocrAction:run' },
            ],
            validation: { isRequired: true },
        }),
        steps: relationship({
            ref: 'OrchestrationStep.orchestrator',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['order', 'agent', 'inputMapping', 'storeOutputAs'],
                inlineEdit: { fields: ['order', 'inputMapping', 'storeOutputAs'] },
                linkToItem: true,
                inlineCreate: { fields: ['order', 'agent', 'inputMapping', 'storeOutputAs'] },
            },
        }),
    },
});