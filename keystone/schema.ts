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

import {ocrService} from './tesseract'

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
    access: // allowAll,
    {
      operation: allowAll,
      filter: {
        query: ({ session, context, listKey, operation }) => {
          
          if (isAdmin({session}) || isOwner({session}))  {
            return true
          } 

          if (isUser({session})) {
            return {email: {equals: session?.data.email}}
          }

          // graphql playgound doesn't have any session data, so 
          // if we don't return true at the very end here, we wont
          // be able to access any data through it.....
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
      companies: relationship({
        ref: "Company",
        many: true,
        ui: {
          labelField: "name"
        }
      })      
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
        ref: "Company",
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
        ref: "Company",
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
      ocrData: text()
    },
    hooks: {
      afterOperation: async ({ operation, item, context }) => {

        // add validation to check that file exists :D
        console.log(item)

        if (operation === 'create') {

          const { file_filename, id  } = item;

          const file_extension = file_filename?.split('.')[1]

          if (file_extension === "pdf") {
            console.log("PDF not supported")
            return
          }

          try {

            const ocrData = await ocrService({
              imagePath: `http://localhost:3000/files/${file_filename}`,
              language: "fin"
            }) as string
  

            await context.db.Attachment.updateOne({
              where: { id },
              data: { ocrData },
            });

          } catch (err) {

            console.log("afterOperation catch")
            throw new Error(`ocrData Service failed with error: ${err}`)

          }
        }     

      }      
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
      company: relationship({
        ref: "Company",
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

  Company: list({
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
