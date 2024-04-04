import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  integer,
  calendarDay,
  checkbox
} from '@keystone-6/core/fields';

import { isAdmin, isOwner, isUser } from '../roles'


export const AccountingPeriod = list({
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
  })