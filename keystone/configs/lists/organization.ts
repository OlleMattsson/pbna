import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
} from '@keystone-6/core/fields';

import { isAdmin, isOwner, isUser } from '../roles'

export const Organization = list({
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