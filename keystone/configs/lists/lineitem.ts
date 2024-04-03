import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  integer,
  calendarDay,
  decimal,
} from '@keystone-6/core/fields';


export const LineItem = list({
    access: allowAll,
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["description", "account", "debit", "credit"]
      }
    },

    // this is the fields for our Tag list
    fields: {

      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        validation: {isRequired: true},
        ui: { 
          createView: {
            fieldMode: "hidden" 
          } 
        }
      }),

      createdBy: relationship({
        ref: "User",
        ui: {
          hideCreate: true,
        }
      }),

      owner: relationship({
        ref: "Organization",
        ui: {
          hideCreate: true,
        }
      }),

      accountingPeriod: relationship({
        ref: "AccountingPeriod"
      }),
      
      // account id
      account: relationship({
        ref: 'Account',
        ui: {
          labelField: "name",
        }
      }),

      date: calendarDay({label: "Transaction Date"}),

      debit: decimal({
        scale: 2,
      }),

      credit: decimal({
        scale: 2,
      }),
      
      description: text(),

      order: integer(),
    },
    
  })