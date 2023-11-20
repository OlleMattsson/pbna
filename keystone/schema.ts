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
  decimal,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';
import { attachmentAfterOperation } from './hooks/attachment_afteroperation';




type Session = {
  data: {
    id: string;
    name: string;
    role: string;
    email: string;
  }
}

const isAdmin = ({ session } : {session: Session}) => {
  if (session?.data.role === 'admin') {
    return true
  } 
  
  return false
}

const isOwner = ({ session } : {session: Session}) => {
  if (session?.data.role === 'owner') {
    return true
  } 
  
  return false
}


const isUser = ({ session } : {session: Session}) => {
  if (session?.data.role === 'user') {
    return true
  } 
  
  return false
}

export const lists: Lists = {
  
  User: list({
    access:{
      operation: allowAll,
      filter: {

        /*
          Users should only be able to see their own profile
          Owners should be able to see all users belonging to their organization
          Admin sees everything
        */
        query: ({ session, context, listKey, operation }) => {
          
          if (isAdmin({session}) || isOwner({session}))  {
            return true
          } 

          if (isUser({session})) {
            return {email: {equals: session?.data.email}}
          }

          // NOTE: graphql playgound doesn't have any session data, so 
          // if we don't return true at the very end here, we wont
          // be able to access any data through it.....

          // TODO: remove before publishing. playground access needs to happen
          // with a valid token.
          return true 
        }
      }
    },
    

    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),
      
      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
        ui: { 
          createView: {
            fieldMode: "hidden" 
          } 
        }
      }),

      role: select({
        type: "string",
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Owner', value: 'owner' },
        ],
        validation: { isRequired: true},
        ui: { displayMode: 'select' }
      }),

      organizations: relationship({
        ref: "Organization",
        many: true,
        ui: {
          labelField: "name"
        }
      })

    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "organizations", "role", "createdAt"]
      }
    }
  }),

  /*

  Entries and Line Items have a few overlapping "system" level fields, namely.
  createdAt, createdBy. owner, date & description. This might seem redundant.
  The reason for this is that even though these entry and list item are tightly related 
  (one should not exist without the other), we still need to query for them separately
  in various situations. The thinking is taht, having to always follow the relationship 
  between the two to find the other, would be inefficient from a database pow.

  In terms of journal views, we need to be able to find entries quickly based on date
  and ownership.

  In terms of individual account views, we need to be able to quickly find related line items
  without having to look up ever entry first.

  So in order to save on compute, we redundantly store the above data fields explicitly for 
  each row. This also helps us debugging the DB.

  In the PBNA user client, the client logic takes care of settings these fields for us.

  */

  Entry: list({
    access: allowAll,
    fields: {
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        validation: { isRequired: true },
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

      date: calendarDay({
        label: "Transaction Date",
        validation: {isRequired: true},
      }),

      entryNumber: integer({
        label: "Entry Number",
        validation: {isRequired: true},
      }),

      description: text(),

      lineItems: relationship({
        ref: 'LineItem',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"],
          linkToItem: true,
          removeMode: 'disconnect',
          inlineCreate: { fields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"] },
          inlineEdit: { fields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"] },
          inlineConnect: true,        
        }
      }),

      attachments: relationship({ 
        ref: 'Attachment', 
        many: true 
      }),

    },
    ui: {
      label: "Journal",
      listView: {
        initialColumns: ["entryNumber", "date", "description"]
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

      date: calendarDay({label: "Transaction Date"}),

      // account id
      account: relationship({
        ref: 'Account',
        ui: {
          labelField: "description",
        }
      }),

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
      }),

      description: text(),
    },
    
  }),


  Attachment :list({
    access: allowAll,
    fields: {
      name: text(),
      description: text(),
      file: file({storage: "journal_item_files"}),
      ocrData: document(),
      inferredData: text()
    },
    hooks: {
      afterOperation: attachmentAfterOperation
    }
  }),

  // Chart of Accounts, "kontoplan"
  AccountChart: list ({
    access: allowAll,
    fields: {
      name: text(),
      description: text(),
      accounts: relationship({
        ref: "Account",
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ["account", "name", "description", "type", "vatAmount", "vatAccount"],
          linkToItem: true,
          removeMode: 'disconnect',
          inlineCreate: { fields: ["account", "name", "description", "type", "vatAmount", "vatAccount"] },
          inlineEdit: { fields: ["account", "name", "description", "type", "vatAmount", "vatAccount"] },
          inlineConnect: true,        
        }
      })
    },
    ui: {
      label: "Chart of Accounts",
      listView: {
        initialColumns: ["name", "description"]
      }
    }
  }),
  
  Account: list({
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
  }),

  AccountingPeriod: list({
    access: allowAll,
    fields: {
      label: text(),
      organization: relationship({
        ref: "Organization",
        many: false
      }),
      accountChart: relationship({
        ref: "AccountChart",
        many: false
      }),
      startDate: calendarDay({label: "Start Date"}),
      endDate: calendarDay({label: "End Date"}),


    }
  }),

  Organization: list({
    access: allowAll,
    fields: {
      name: text(),
      addressStreet: text(),
      addressPostalCode: text(),
      addressCity: text(),
      addressCountry: text(),
      phone: text(),
      email: text(),
      website: text(),
      businessID: text(), // "y-tuunus", 1234567-8
      vatNumber: text(), // // FI12345678
      owner: relationship({
        ref: "User",
        many: false,
        ui: {
          labelField: "name"
        }
      }),
      users: relationship({
        ref: "User",
        many: true,
        ui: {
          labelField: "name"
        }
      })
    },
    ui: {
      labelField: 'name',
    },
  })
};
