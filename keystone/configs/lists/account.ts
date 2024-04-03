import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  select,
  integer,
  decimal,
} from '@keystone-6/core/fields';

export const Account = list({
    access: allowAll,
    ui: {
      labelField: 'name',
    },
    fields: {
      account: integer(),
      name: text(),
      description: text(),
      type: select({
        type: "string",
        options: [
          { label: 'Asset', value: '0' },
          { label: 'Liability', value: '1' },
          { label: 'VAT', value: '2' },
          { label: 'IncomeStatement', value: '3' },
          { label: 'Noop', value: '4' },
        ],
        validation: { isRequired: true},
        ui: { displayMode: 'select' }
      }),
      vatAmount: decimal({
        scale: 2,
      }),
      vatAccount: relationship({
        ref: 'Account'
      })
    }
  })