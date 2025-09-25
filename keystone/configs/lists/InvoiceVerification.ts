/*

    Invoice verification 
    
    - made by agentOutput
    - user verifies
    - subsequent orchestrators can use the context stored in the agentOutput
      as their initial state

*/

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { runOrchestrator } from "../../helpers/orchestrator";

import {
  text,
  checkbox,
  json,
  select,
  textarea,
  relationship,
  timestamp,
} from "@keystone-6/core/fields";

const statusFieldAfterOperation = async ({ operation, item, context }) => {
  if (operation === "update" && item.status === "verified") {
    // run all orchestrators that are configured to listen to this evetn
    const orchestrators = await context.query.Orchestrator.findMany({
      where: {
        triggerEvent: {
          equals: "InvoiceVerification:afterOperation:update:verified",
        },
        AND: { isEnabled: { equals: true } },
      },
      query: `id name`,
    });

    console.log(
      `Found ${orchestrators.length} orchestrators for InvoiceVerification ${item.id}`
    );

    for (const orchestrator of orchestrators) {
      console.log(
        `InvoiceVerification:afterOperation:update:verified: running orchestrator ${orchestrator.name} for invoice ${item.id}`
      );

      await runOrchestrator({
        context,
        orchestratorId: orchestrator.id,
        contextMap: item, // initial state, place everything the first agent needs here...
      });
    }
  }
};

export const InvoiceVerification = list({
  access: allowAll,
  fields: {
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: { itemView: { fieldMode: "read" } },
    }),

    status: select({
      options: [
        { label: "Pending", value: "pending" },
        { label: "Verified", value: "verified" },
      ],
      defaultValue: "pending",
      ui: { displayMode: "segmented-control" },
      hooks: {
        afterOperation: statusFieldAfterOperation,
      },
    }),

    verifiedAt: timestamp(),

    verifiedBy: relationship({
      ref: "User",
      many: false,
    }),

    invoice: relationship({
      ref: "Invoice",
      many: false,
    }),

    // the agent that made the verification request
    // it as the context of the previous orchestration run
    agentOutput: relationship({
      ref: "AgentOutput",
      many: false,
    }),
  },
});
