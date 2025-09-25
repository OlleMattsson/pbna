import { list } from "@keystone-6/core";
import {
  relationship,
  select,
  timestamp,
  text,
  json,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const VerifyInvoice = list({
  access: allowAll,
  ui: {
    labelField: "id",
    listView: {
      initialColumns: ["createdAt", "status"],
    },
  },
  fields: {
    invoice: relationship({
      ref: "Invoice",
      many: false,
      ui: { displayMode: "select" },
    }),
    // the artifact the user is reviewing
    inputAgentOutput: relationship({ ref: "AgentOutput", many: false }),
    // the artifact that was actually approved (can equal input if no edits)
    approvedAgentOutput: relationship({ ref: "AgentOutput", many: false }),

    status: select({
      options: [
        { label: "Awaiting", value: "awaiting" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Superseded", value: "superseded" },
        { label: "Expired", value: "expired" },
      ],
      defaultValue: "awaiting",
    }),

    // optional: who/when
    requestedByUserId: text({
      ui: { description: "User who initiated review (optional)" },
    }),
    approvedByUserId: text(),
    approvedAt: timestamp(),

    // orchestration follow-up
    triggeredWorkflowId: text(), // e.g. 'postings_from_invoice'
    triggeredRunId: text(), // OrchestratorRun.id (if you store runs)

    metadata: json(), // freeform (UI hints, diffs, etc.)
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },

  hooks: {
    // keep it strict & deterministic
    resolveInput: async ({ resolvedData, context, operation, item }) => {
      // only validate on create/update of input AO or invoice
      const invoiceId = resolvedData.invoice?.connect?.id ?? item?.invoiceId;
      const aoId =
        resolvedData.inputAgentOutput?.connect?.id ?? item?.inputAgentOutputId;

      if (invoiceId && aoId) {
        const ao = await context.query.AgentOutput.findOne({
          where: { id: aoId },
          query: "id resourceType resourceId schemaId",
        });
        if (!ao) throw new Error("inputAgentOutput not found");
        if (ao.resourceType !== "Invoice" || ao.resourceId !== invoiceId) {
          throw new Error("inputAgentOutput does not belong to this invoice");
        }
        // optionally enforce expected schema
        // if (ao.schemaId !== 'invoice.sanitized.v1') throw new Error('unexpected schema for verification');
      }
      return resolvedData;
    },

    // fire next workflow when status flips to approved
    afterOperation: async ({ operation, item, originalItem, context }) => {
      if (operation !== "update") return;
      const was = originalItem?.status;
      const now = item?.status;

      if (was !== "approved" && now === "approved") {
        // choose approved AO (fallback to input if none explicitly set)
        const approvedAoId =
          item.approvedAgentOutputId ?? item.inputAgentOutputId;
        if (!approvedAoId) return;

        // update invoice quick status (optional)
        await context.db.Invoice.updateOne({
          where: { id: item.invoiceId },
          data: { status: "verified" },
        });

        // queue the next workflow deterministically
        const workflowId = item.triggeredWorkflowId || "postings_from_invoice";
        const correlationId = `postings:${item.invoiceId}:${approvedAoId}`;

        const run = await context.db.OrchestratorRun.createOne({
          data: {
            workflowId,
            resourceType: "Invoice",
            resourceId: item.invoiceId,
            inputAgentOutputIds: [approvedAoId],
            status: "queued",
            correlationId,
          },
          query: "id",
        });

        // store the run id for audit
        await context.db.VerifyInvoice.updateOne({
          where: { id: item.id },
          data: { triggeredWorkflowId: workflowId, triggeredRunId: run.id },
        });
      }
    },
  },
});
