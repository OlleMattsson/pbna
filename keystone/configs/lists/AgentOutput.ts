import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
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
      step: relationship({ ref: 'OrchestrationStep.outputs', many: false }),
  
      input: json({ defaultValue: {} }),
      output: json({ defaultValue: {} }),
      error: json({ defaultValue: null }),
      contextSnapshot: json({ defaultValue: {} }),
  
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
        initialColumns: ['agent', 'status', 'createdAt'],
        initialSort: { field: 'createdAt', direction: 'DESC' },
      },
    },
    hooks: {
      afterOperation: async ({ operation, item, context }) => {

        console.log("[AgentOutput]", operation, item)

        if (operation !== 'update') return;
        if (item.status !== 'completed') return;
      
        // Load full step with orchestrator & order info
        const step = await context.query.OrchestrationStep.findOne({
          where: { id: item.stepId },
          query: `
            id 
            order 
            orchestrator { 
              id 
              steps { 
                id 
                order
                storeOutputAs
                inputMapping
                agent{ 
                  id 
                  type
                  functionName
                } 
              } 
            }`
        });

      
        const orchestrator = step.orchestrator;
        const nextStep = getNextStep(orchestrator.steps, step.order);

        

        if (!nextStep) {
          console.log(`✅ Orchestrator complete: ${orchestrator.id}`);
          return;
        }
      
        //console.log("[AgentOutput] next step", nextStep)
        
        const previousSnapshot = item.contextSnapshot || {}
        const currentOutput = item.output;
        const key = step.storeOutputAs; 
        
        console.log("[AgentOutput] step", step)


        const updatedContext = {
          ...previousSnapshot,
          ...{ [key]: currentOutput }
        };

        console.log("OUTPUTT", currentOutput)
        console.log("UPDATED CONTEXT", updatedContext)

        await runOrchestrationStep(nextStep, updatedContext, context);
      }
    }
  });

  function getNextStep(steps, currentOrder) {
    const sorted = steps.sort((a, b) => a.order - b.order);
    return sorted.find(s => s.order > currentOrder);
  }
  