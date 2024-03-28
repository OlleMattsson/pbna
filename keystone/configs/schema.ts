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
  checkbox
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';
import { attachmentAfterOperation } from '../hooks/attachment_afteroperation';
import util from 'util'



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

      organization: relationship({
        ref: "Organization",
        many: false,
        ui: {
          labelField: "name"
        }
      }),

      invitationToken: text(),

    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "organization", "role", "createdAt"]
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
    access: {
      operation: allowAll,
      filter: {
        query: ({ session, context, listKey, operation }) => {
          
          // for debugging, this essentially turns of access control
          return true

          if (isAdmin({session})) {
            return true
          }

          if (isOwner({session}))  {
            return {
              owner: {
                id: {
                  equals: session?.data.organization.id}} // TODO: add support for mutliple orgs
                }
          } 

          return false

        }
      }
    },
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
      }),

      entryNumber: integer({
        label: "Entry Number",
      }),

      description: text(),

      lineItems: relationship({
        ref: 'LineItem',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ["createdAt", "createdBy", "owner", "account", "debit", "credit", "description"],
          linkToItem: true,
          removeMode: 'disconnect',
          inlineCreate: { fields: ["createdAt", "createdBy", "owner", "account", "debit", "credit", "description"] },
          inlineEdit: { fields: ["createdAt", "createdBy", "owner", "account", "debit", "credit", "description"] },
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
    },
    graphql: {
      plural: "entrys" // we need to rename this from entries -> entrys for react-admins gql introsepction package
    }
  }),


  LineItem: list({
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

      date: calendarDay({label: "Transaction Date"}),

      // account id
      account: relationship({
        ref: 'Account',
        ui: {
          labelField: "name",
        }
      }),

      debit: decimal({
        scale: 2,
      }),

      credit: decimal({
        scale: 2,
      }),
      
      description: text(),

      order: integer(),
    },
    
  }),


  Attachment :list({
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
      name: text(),
      description: text(),
      file: file({storage: "journal_item_files"}),
      ocrData: document(),
      ocrStatus: text(), // queued / inprogress / success / failed
      extractedData: text(),
      dataExtractionStatus: text() // queued / inprogress/ success / failed
    },
    hooks: {
      afterOperation: attachmentAfterOperation
    },
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["name", "ocrStatus", "dataExtractionStatus"]
      }
    },
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
    access: {
      operation: allowAll,
      filter: {
        query: ({ session, context, listKey, operation }) => {
          
          if (isAdmin({session})) {
            return true
          }

          if (isOwner({session}))  {
            return {
              owner: {
                id: {
                  equals: session?.data.organization.id 
                }
              }
            }
          }

          return false

        }
      }
    },
    fields: {
      owner: relationship({
        ref: "Organization",
        many: false
      }),
      label: text(),
      accountChart: relationship({
        ref: "AccountChart",
        many: false
      }),
      startDate: calendarDay({label: "Start Date"}),
      endDate: calendarDay({label: "End Date"}),
      vatReportingDate: integer({}),
      vatReportingFrequency: integer(),
      isActive: checkbox({
        defaultValue: false
      })
    }
  }),

  Organization: list({
    access:{
      operation: allowAll,
      filter: {
        query: ({ session, context, listKey, operation }) => {

          if (isAdmin({session})) {
            return true
          }

          if (isOwner({session}))  {
            return {
              owner: {
                id: {
                  equals: session?.data.id
                }
              }
            }
          } 

          return false

        }
      }
    },
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
