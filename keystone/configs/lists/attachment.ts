import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  timestamp,
  file,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { attachmentAfterOperation } from '../../hooks/attachment_afteroperation';

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
      dataExtractionStatus: text() // queued / inprogress/ success / failed
    },
    hooks: {
      afterOperation: attachmentAfterOperation
    },
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ["name", "ocrStatus", "dataExtractionStatus"]
      }
    },
  })