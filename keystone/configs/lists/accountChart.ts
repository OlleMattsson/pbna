import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
} from '@keystone-6/core/fields';


export const AccountChart = list ({
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
  })