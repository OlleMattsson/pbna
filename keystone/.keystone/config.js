"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      isAdmin: (0, import_fields.checkbox)(),
      entries: (0, import_fields.relationship)({ ref: "Entry.createdBy", many: true }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" },
        ui: {
          createView: {
            fieldMode: "hidden"
          }
        }
      })
    },
    ui: {
      listView: {
        initialColumns: ["name", "email", "isAdmin", "createdAt"]
      }
    }
  }),
  Entry: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" },
        validation: { isRequired: true },
        ui: {
          createView: {
            fieldMode: "hidden"
          }
        }
      }),
      createdBy: (0, import_fields.relationship)({
        ref: "User.entries",
        ui: {
          hideCreate: true
        }
      }),
      entryId: (0, import_fields.integer)({ label: "Entry Number" }),
      date: (0, import_fields.calendarDay)({ label: "Transaction Date" }),
      description: (0, import_fields.text)(),
      lineItems: (0, import_fields.relationship)({
        ref: "LineItem",
        many: true
        //ui: {displayMode: 'cards'}
      }),
      attachments: (0, import_fields.relationship)({
        ref: "Attachment",
        many: true
      })
    },
    ui: {
      label: "Journal",
      listView: {
        initialColumns: ["entryId", "date", "description"]
      }
    }
  }),
  LineItem: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["description", "account", "type", "amount"]
      }
    },
    // this is the fields for our Tag list
    fields: {
      // journal entry description
      description: (0, import_fields.text)(),
      // account id
      account: (0, import_fields.text)(),
      // debit or credit
      type: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Debit", value: "d" },
          { label: "Credit", value: "c" }
        ],
        validation: { isRequired: true },
        ui: { displayMode: "radio" }
      }),
      // amount to be debited or credited
      amount: (0, import_fields.integer)({
        validation: { isRequired: true }
      }),
      // decimal precision of integer      
      precision: (0, import_fields.integer)({
        defaultValue: 0
      })
      // note: there's a decimal fiel type but it is not supported by sdqlite
      // amountWithDecimal: decimal()
    }
  }),
  Attachment: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      description: (0, import_fields.text)(),
      file: (0, import_fields.file)({ storage: "journal_item_files" })
    }
  })
};

// keystone.ts
var keystone_default = (
  //withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    //session,
    storage: {
      journal_item_files: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `http://localhost:3000/files${path}`,
        serverRoute: {
          path: "/files"
        },
        storagePath: "public/files"
      }
    }
  })
);
//# sourceMappingURL=config.js.map