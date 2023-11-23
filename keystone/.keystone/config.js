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
var import_fields_document = require("@keystone-6/fields-document");

// hooks/attachment_afteroperation.ts
var import_redis_smq = require("redis-smq");

// ../common/redis-smq-config.js
var config = {
  redis: {
    client: "redis_v4",
    options: {
      socket: {
        host: "redis"
      }
    }
  }
};
var queueNames = {
  llamaDataExtraction: "llama-data-extraction",
  tesseract: "tesseract"
};

// hooks/attachment_afteroperation.ts
import_redis_smq.QueueManager.createInstance(config, (err, queueManager) => {
  if (err)
    console.log(err);
  else {
    queueManager.queue.create(queueNames.tesseract, false, (err2) => console.log(err2));
    queueManager.queue.create(queueNames.llamaDataExtraction, false, (err2) => console.log(err2));
  }
});
function smqRun(message, config3) {
  const producer = new import_redis_smq.Producer(config3);
  producer.run((err) => {
    if (err)
      throw err;
    message.getId();
    producer.produce(message, (err2) => {
      if (err2)
        console.log(err2);
      else {
        const msgId = message.getId();
        console.log("Successfully produced. Message ID is ", msgId);
      }
    });
  });
}
async function attachmentAfterOperation({ operation, item, context }) {
  console.log(item);
  if (operation === "create") {
    const { file_filename, id } = item;
    const file_extension = file_filename?.split(".")[1];
    if (file_extension === "pdf") {
      console.log("PDF not supported");
      return;
    }
    try {
      await context.db.Attachment.updateOne({
        where: { id },
        data: {
          ocrStatus: "queued",
          dataExtractionStatus: "queued"
        }
      });
      const ocrmsg = new import_redis_smq.Message();
      ocrmsg.setBody({
        attachmentId: id,
        imagePath: file_filename,
        language: "fin"
      }).setTTL(1e3 * 60).setQueue(queueNames.tesseract);
      smqRun(ocrmsg, config);
    } catch (err) {
      console.log(err);
    }
  }
}

// schema.ts
var isAdmin = ({ session }) => {
  if (session?.data.role === "admin") {
    return true;
  }
  return false;
};
var isOwner = ({ session }) => {
  if (session?.data.role === "owner") {
    return true;
  }
  return false;
};
var isUser = ({ session }) => {
  if (session?.data.role === "user") {
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
        query: ({ session, context, listKey, operation }) => {
          if (isAdmin({ session }) || isOwner({ session })) {
            return true;
          }
          if (isUser({ session })) {
            return { email: { equals: session?.data.email } };
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
    },
    graphql: {
      itemQueryName: "Entry",
      listQueryName: "allEntry"
      //plural: "entrys"
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
      ocrData: (0, import_fields_document.document)(),
      ocrStatus: (0, import_fields.text)(),
      // queued / inprogress / success / failed
      extractedData: (0, import_fields.text)(),
      dataExtractionStatus: (0, import_fields.text)()
      // queued / inprogress/ success / failed
    },
    hooks: {
      afterOperation: attachmentAfterOperation
    },
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["name", "ocrStatus", "dataExtractionStatus"]
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

// keystone.ts
var keystone_default = (
  //withAuth(
  (0, import_core2.config)({
    server: {
      cors: {
        origin: [
          "http://localhost:8080",
          "http://localhost:5173"
        ],
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: "postgres://pbna_pguser:pbna_pgpw@postgres/pbna_pgdb",
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    lists,
    //session,
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
