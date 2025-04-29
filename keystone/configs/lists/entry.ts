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


import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  integer,
  calendarDay,

} from '@keystone-6/core/fields';

import { isAdmin, isOwner, isUser } from '../roles';

export const Entry = list({
    access: {
      operation: allowAll,
      filter: {
        query: ({ session, context, listKey, operation }) => {
          
          //console.log(session)


          // for debugging, this essentially turns of access control
          //return true

          if (isAdmin({session})) {
            return true
          }

          if (isOwner({session}))  {

            console.log("isOwner", session)
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

      accountingPeriod: relationship({
        ref: "AccountingPeriod"
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
          cardFields: ["accountingPeriod", "account", "debit", "credit"],
          linkToItem: true,
          removeMode: 'disconnect',
          inlineCreate: { fields: ["accountingPeriod", "account", "debit", "credit"] },
          inlineEdit: { fields: ["accountingPeriod", "account", "debit", "credit"] },
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
        initialColumns: ["entryNumber", "date", "description", "accountingPeriod"]
      }
    },
    graphql: {
      plural: "entrys" // we need to rename this from entries -> entrys for react-admins gql introsepction package
    }
  })