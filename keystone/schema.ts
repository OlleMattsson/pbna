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


const filterLineItems = ({ session }: { session: Session }) => {
  // if the user is an Admin, they can access all the records
  if (session?.data.role === 'admin') return true;
  // otherwise, filter for published posts
  return { isPublished: { equals: true } };
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
        ui: {
          displayMode: 'cards',
          cardFields: ["account", "type", "amount", "description"],
          linkToItem: true,
          removeMode: 'disconnect',
          inlineCreate: { fields: ["account", "type", "amount", "description"] },
          inlineEdit: { fields: ["account", "type", "amount", "description"] },
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
      file: file({storage: "journal_item_files"})
    }
  }),

  
  Account: list({
    access: allowAll,
    ui: {
      labelField: 'name',
    },
    fields: {
      account: integer(),
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
      name: text(),
      description: text(),
      vatAmount: decimal({
        scale: 2,
      }),
      vatAccount: relationship({
        ref: 'Account'
      })
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
