import { list } from '@keystone-6/core';
import { integer, json, text, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';


export const OrchestrationStep = list({
access: allowAll,
  fields: {
    orchestrator: relationship({
      ref: 'Orchestrator.steps',
      ui: { hideCreate: true },
    }),
    order: integer({
      validation: { isRequired: true },
      ui: { description: 'Execution order of the step' },
    }),
    agent: relationship({
      ref: 'Agent',
      ui: { displayMode: 'select' },
    }),
    inputMapping: json({
      ui: { description: 'How to derive input from previous step outputs' },
    }),
    storeOutputAs: text({
      ui: { description: 'Save result under this name in the orchestrator’s context' },
    }),
    outputs: relationship({
      ref: 'AgentOutput.step',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['status', 'createdAt'],
        inlineCreate: { fields: ['status'] },
        inlineEdit: { fields: ['status'] },
      },
    }),    
  },
});