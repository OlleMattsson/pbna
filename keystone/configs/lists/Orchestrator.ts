import { list } from "@keystone-6/core";
import { text, select, relationship, checkbox } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { INVOICE_UPDATE_STATUS_VERIFIED } from "../../events/invoiceUpdateStatusVerified";

export const Orchestrator = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text(),
    triggerEvent: select({
      options: [
        {
          label: "None",
          value: "none",
        },
        { label: "Attachment OCR", value: "attachment.ocrAction:run" },
        {
          label: "Invoice AfterOperation Create",
          value: "invoice:afterOperation:create",
        },
        {
          label: "Invoice status updated to verified",
          value: INVOICE_UPDATE_STATUS_VERIFIED,
        },
        {
          label: "InvoiceVerification:afterOperation:update:verified",
          value: "InvoiceVerification:afterOperation:update:verified",
        },
      ],
      validation: { isRequired: true },
    }),
    steps: relationship({
      ref: "OrchestrationStep.orchestrator",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["order", "agent"],
        inlineEdit: {
          fields: ["order", "agent", "inputMapping", "storeOutputAs"],
        },
        linkToItem: true,
        inlineCreate: { fields: ["order", "agent"] },
        views: "./admin/fields/orderedStepsRelationship",
      },
    }),
    isEnabled: checkbox({ defaultValue: true }),
  },
});
