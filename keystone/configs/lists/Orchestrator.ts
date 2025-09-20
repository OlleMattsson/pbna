import { list } from "@keystone-6/core";
import { text, select, relationship, checkbox } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const Orchestrator = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text(),
    triggerEvent: select({
      options: [
        { label: "Attachment OCR", value: "attachment.ocrAction:run" },
        {
          label: "Invoice AfterOperation Create",
          value: "invoice:afterOperation:create",
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
        inlineEdit: { fields: ["order"] },
        linkToItem: true,
        inlineCreate: { fields: ["order", "agent"] },
      },
    }),
    isEnabled: checkbox({ defaultValue: true }),
  },
});
