"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// tesseract.ts
var import_tesseract = __toESM(require("tesseract.js"));
function ocrService(opts) {
  const { imagePath, language } = opts;
  return new Promise((resolve, reject) => {
    import_tesseract.default.recognize(
      imagePath,
      language,
      { logger: (m) => console.log(m) }
    ).then(({ data: { text: text2 } }) => {
      resolve(text2);
    }).catch((err) => {
      console.log("CAUGHT!");
      console.log(err);
      reject(err);
    });
  });
}

// schema.ts
var isAdmin = ({ session: session2 }) => {
  if (session2?.data.role === "admin") {
    return true;
  }
  return false;
};
var isOwner = ({ session: session2 }) => {
  if (session2?.data.role === "owner") {
    return true;
  }
  return false;
};
var isUser = ({ session: session2 }) => {
  if (session2?.data.role === "user") {
    return true;
  }
  return false;
};
var lists = {
  User: (0, import_core.list)({
    access: {
      operation: import_access.allowAll,
      filter: {
        /*
          Users should only be able to see their own profile
          Owners should be able to see all users belonging to their organization
          Admin sees everything
        */
        query: ({ session: session2, context, listKey, operation }) => {
          if (isAdmin({ session: session2 }) || isOwner({ session: session2 })) {
            return true;
          }
          if (isUser({ session: session2 })) {
            return { email: { equals: session2?.data.email } };
          }
          return true;
        }
      }
    },
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" },
        ui: {
          createView: {
            fieldMode: "hidden"
          }
        }
      }),
      role: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Owner", value: "owner" }
        ],
        validation: { isRequired: true },
        ui: { displayMode: "select" }
      }),
      organizations: (0, import_fields.relationship)({
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
        ref: "User",
        ui: {
          hideCreate: true
        }
      }),
      owner: (0, import_fields.relationship)({
        ref: "Organization",
        ui: {
          hideCreate: true
        }
      }),
      date: (0, import_fields.calendarDay)({
        label: "Transaction Date",
        validation: { isRequired: true }
      }),
      entryNumber: (0, import_fields.integer)({
        label: "Entry Number",
        validation: { isRequired: true }
      }),
      description: (0, import_fields.text)(),
      lineItems: (0, import_fields.relationship)({
        ref: "LineItem",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"],
          linkToItem: true,
          removeMode: "disconnect",
          inlineCreate: { fields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"] },
          inlineEdit: { fields: ["createdAt", "createdBy", "owner", "account", "type", "amount", "description"] },
          inlineConnect: true
        }
      }),
      attachments: (0, import_fields.relationship)({
        ref: "Attachment",
        many: true
      })
    },
    ui: {
      label: "Journal",
      listView: {
        initialColumns: ["entryNumber", "date", "description"]
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
        ref: "User",
        ui: {
          hideCreate: true
        }
      }),
      owner: (0, import_fields.relationship)({
        ref: "Organization",
        ui: {
          hideCreate: true
        }
      }),
      date: (0, import_fields.calendarDay)({ label: "Transaction Date" }),
      // account id
      account: (0, import_fields.relationship)({
        ref: "Account",
        ui: {
          labelField: "description"
        }
      }),
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
      amount: (0, import_fields.decimal)({
        scale: 2,
        validation: { isRequired: true }
      }),
      description: (0, import_fields.text)()
    }
  }),
  Attachment: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      description: (0, import_fields.text)(),
      file: (0, import_fields.file)({ storage: "journal_item_files" }),
      ocrData: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: async ({ operation, item, context }) => {
        console.log(item);
        if (operation === "create") {
          const { file_filename, id } = item;
          const file_extension = file_filename?.split(".")[1];
          if (file_extension === "pdf") {
            console.log("PDF not supported");
            return;
          }
          try {
            const ocrData = await ocrService({
              imagePath: `http://localhost:3000/files/${file_filename}`,
              language: "fin"
            });
            await context.db.Attachment.updateOne({
              where: { id },
              data: { ocrData }
            });
          } catch (err) {
            console.log("afterOperation catch");
            throw new Error(`ocrData Service failed with error: ${err}`);
          }
        }
      }
    }
  }),
  // Chart of Accounts, "kontoplan"
  AccountChart: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      description: (0, import_fields.text)(),
      accounts: (0, import_fields.relationship)({
        ref: "Account",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["account", "name", "description", "type", "vatAmount", "vatAccount"],
          linkToItem: true,
          removeMode: "disconnect",
          inlineCreate: { fields: ["account", "name", "description", "type", "vatAmount", "vatAccount"] },
          inlineEdit: { fields: ["account", "name", "description", "type", "vatAmount", "vatAccount"] },
          inlineConnect: true
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
  Account: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      labelField: "name"
    },
    fields: {
      account: (0, import_fields.integer)(),
      name: (0, import_fields.text)(),
      description: (0, import_fields.text)(),
      type: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Asset", value: "0" },
          { label: "Liability", value: "1" },
          { label: "VAT", value: "2" },
          { label: "IncomeStatement", value: "3" },
          { label: "Noop", value: "4" }
        ],
        validation: { isRequired: true },
        ui: { displayMode: "select" }
      }),
      vatAmount: (0, import_fields.decimal)({
        scale: 2
      }),
      vatAccount: (0, import_fields.relationship)({
        ref: "Account"
      })
    }
  }),
  AccountingPeriod: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      label: (0, import_fields.text)(),
      organization: (0, import_fields.relationship)({
        ref: "Organization",
        many: false
      }),
      accountChart: (0, import_fields.relationship)({
        ref: "AccountChart",
        many: false
      }),
      startDate: (0, import_fields.calendarDay)({ label: "Start Date" }),
      endDate: (0, import_fields.calendarDay)({ label: "End Date" })
    }
  }),
  Organization: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      addressStreet: (0, import_fields.text)(),
      addressPostalCode: (0, import_fields.text)(),
      addressCity: (0, import_fields.text)(),
      addressCountry: (0, import_fields.text)(),
      phone: (0, import_fields.text)(),
      email: (0, import_fields.text)(),
      website: (0, import_fields.text)(),
      businessID: (0, import_fields.text)(),
      // "y-tuunus", 1234567-8
      vatNumber: (0, import_fields.text)(),
      // // FI12345678
      owner: (0, import_fields.relationship)({
        ref: "User",
        many: false,
        ui: {
          labelField: "name"
        }
      }),
      users: (0, import_fields.relationship)({
        ref: "User",
        many: true,
        ui: {
          labelField: "name"
        }
      })
    },
    ui: {
      labelField: "name"
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt role id email",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      cors: {
        origin: [
          "http://localhost:8080"
        ],
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: "postgres://pbna_pguser:pbna_pgpw@localhost/pbna_pgdb",
      //url: process.env.DATABASE_URL as string,
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    lists,
    session,
    storage: {
      journal_item_files: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `http://localhost:${process.env.PORT}/files${path}`,
        serverRoute: {
          path: "/files"
        },
        storagePath: "public/files"
      }
    }
  })
);
//# sourceMappingURL=config.js.map
