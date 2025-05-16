import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
    json,
    timestamp,
    relationship,
    select,
  } from '@keystone-6/core/fields';
  
  export const AgentOutput = list({
    access: allowAll,
    fields: {
      agent: relationship({ ref: 'Agent', many: false }),
      step: relationship({ ref: 'OrchestrationStep.outputs', many: false }),
  
      input: json({ defaultValue: {} }),
      output: json({ defaultValue: {} }),
      error: json({ defaultValue: null }),
  
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
  });