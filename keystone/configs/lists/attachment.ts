import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  timestamp,
  file,
  select
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { attachmentAfterOperation } from '../../hooks/attachment_afteroperation';
import { runOrchestrator } from '../../helpers/orchestrator'

export const Attachment = list({
    access: allowAll,
    fields: {
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        validation: {isRequired: true},
        ui: { 
          createView: {
            fieldMode: "hidden" 
          } 
        }
      }),      
      name: text(),
      description: text(),
      file: file({storage: "journal_item_files"}),
      ocrData: document(),
      ocrStatus: text(), // queued / inprogress / success / failed
      extractedData: text(),
      dataExtractionStatus: text(), // queued / inprogress/ success / failed
      ocrAction: select({
        options: [
          { label: 'None', value: 'none' },
          { label: 'Run OCR now', value: 'run' },
          { label: 'Retry OCR', value: 'retry' }, // not implemented
        ],
        defaultValue: 'none',
        ui: {
          displayMode: 'segmented-control', // or 'select'
        },
        hooks: {
          afterOperation: async ({ operation, item, context }) => {
            if (operation === "delete") return
            if (item.ocrAction === 'none') return;


            if (item.ocrAction === 'run') {
                // reset the action field to avoid re- triggering
                await context.db.Attachment.updateOne({
                  where: { id: item.id },
                  data: { ocrAction: 'none' },
                });

              // find orchestrators for this action
              const orchestrators = await context.query.Orchestrator.findMany({
                where: {
                  triggerEvent: { equals: `attachment.ocrAction:${item.ocrAction}` },
                },
                query: `id`,
              });


              const file_extension = item.file_filename?.split('.')[1]
        
              if (file_extension === "pdf") {
                console.log("PDF not supported")
                return
              }
        

              // run orchestrators
              for (const orchestrator of orchestrators) {

                await runOrchestrator({
                  orchestratorId: orchestrator.id,
                  contextMap: { 
                    fileName: item.file_filename,
                    language: "fin"
                  },
                  context
                })
              }


            
            }
      

          },
        },
      }), 
    },

    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["name", "ocrStatus", "dataExtractionStatus"]
      }
    },
  })