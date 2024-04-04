import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

import { isAdmin, isOwner, isUser } from '../roles'

export const User = list({
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
          return false 
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
  })