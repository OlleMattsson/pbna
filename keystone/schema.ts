import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  file,
  calendarDay,
  checkbox,
  decimal
} from '@keystone-6/core/fields';


// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),
      isAdmin: checkbox(),
      
      entries: relationship({ ref: 'Entry.createdBy', many: true }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
        ui: { 
          createView: {
            fieldMode: "hidden" 
          } 
        }
      }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "isAdmin","createdAt"]
      }
    }
  }),


  Entry: list({
    access: allowAll,
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
        ref: "User.entries",
        ui: {
          hideCreate: true,
        }
      }),

      entryId: integer({label: "Entry Number"}),
      date: calendarDay({label: "Transaction Date"}),
      description: text(),
      lineItems: relationship({
        ref: 'LineItem',
        many: true,
        //ui: {displayMode: 'cards'}
      }),
      attachments: relationship({ 
        ref: 'Attachment', 
        many: true 
      }),

    },
    ui: {
      label: "Journal",
      listView: {
        initialColumns: ["entryId", "date", "description"]
      }
    }
  }),


  LineItem: list({
    access: allowAll,
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["description", "account", "type", "amount"]
      }
    },

    // this is the fields for our Tag list
    fields: {
      // journal entry description
      description: text(),

      // account id
      account: text(),

      // debit or credit
      type: select({
        type: "string",
        options: [
          { label: 'Debit', value: 'd' },
          { label: 'Credit', value: 'c' },
        ],
        validation: { isRequired: true},
        ui: { displayMode: 'radio' }
      }),

      amount: decimal({
        scale: 2,
        validation: { isRequired: true},
      })

    },
    
  }),


  Attachment :list({
    access: allowAll,
    fields: {
      name: text(),
      description: text(),
      file: file({storage: "journal_item_files"})
    }
  }),


};
