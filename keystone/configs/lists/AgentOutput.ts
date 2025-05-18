import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    json,
    timestamp,
    relationship,
    select,
  } from '@keystone-6/core/fields';
import { runOrchestrationStep } from '../../helpers/orchestrator'  

  export const AgentOutput = list({
    access: allowAll,
    fields: {
      agent: relationship({ ref: 'Agent', many: false }),
      step: relationship({ 
        ref: 'OrchestrationStep.outputs', 
        many: false, 
        ui: {
          labelField: 'slug',
        }
      }),
      input: json({ defaultValue: {} }),
      output: json({ defaultValue: null }),
      contextSnapshot: json({ defaultValue: {} }),
      
      error: json({ defaultValue: null }),
      failedOutput: json({ defaultValue: null }),
      failedInput: json({ defaultValue: null }),
  
      createdBy: relationship({ ref: 'User', many: false }),
  
      status: select({
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Completed', value: 'completed' },
          { label: 'Failed', value: 'failed' },
        ],
        defaultValue: 'pending',
        ui: { displayMode: 'segmented-control' },
      }),
  
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: { itemView: { fieldMode: 'read' } },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['agent', 'status', 'step', 'createdAt'],
        initialSort: { field: 'createdAt', direction: 'DESC' },
      },
    },
    hooks: {
      afterOperation: async ({ operation, item, context }) => {

        if (operation !== 'update') return;
        if (item.status !== 'completed') return;
      
        // Load full step with orchestrator & order info

        // TODO i think the runorchestrationstep should take an ID
        // and look up everything it needs itself for easier calling
        // on the hook level - 
        const step = await context.query.OrchestrationStep.findOne({
          where: { id: item.stepId },
          query: `
            order 
            storeOutputAs            
            orchestrator { 
              id 
              steps { 
                id 
                order
              } 
            }`
        });

        const orchestrator = step.orchestrator;
        const nextStep = getNextStep(orchestrator.steps, step.order);     

        if (!nextStep) {
          console.log(`✅ Orchestrator complete: ${orchestrator.id}`);
          return;
        }
              
        const previousSnapshot = item.contextSnapshot || {}
        const currentOutput = item.output;
        const key = step.storeOutputAs; 
        const updatedContext = {
          ...previousSnapshot,
          ...{ [key]: currentOutput }
        };

        await runOrchestrationStep(nextStep.id, updatedContext, context);
      }
    }
  });

  function getNextStep(steps, currentOrder) {
    const sorted = steps.sort((a, b) => a.order - b.order);
    return sorted.find(s => s.order > currentOrder);
  }
  