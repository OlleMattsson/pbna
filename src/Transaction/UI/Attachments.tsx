import { generateRandomInteger } from "./../../helpers/generateRandomInt";
import { useState } from "react";

export type Attachment = {[key:string]: {name: string, data:string} }

export const AttachmentList: Function = ({
  attachments, 
  removeAttachment
} : {
  attachments: Attachment[],
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>
  removeAttachment: Function
}) => { 

  const styles = {
    deleteAttachmentAnchor:{textDecoration: "underline", cursor: "pointer"}
  }

  // wrapper for scoping the attachment to the event handler
  const handleOnDelete = (a: Attachment) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    removeAttachment(a)
  }

  return (
    <>
      {attachments.length ? attachments.map((a) => {
        const key = Object.keys(a)[0]
        const data = a[key].data
        const name = a[key].name
        return (
          <div key={key}>
            <img className="thumb" src={`${[data]}`}/>
            <p>remove{" "} 
              <a style={styles.deleteAttachmentAnchor} 
                onClick={handleOnDelete(a)}
              >
                {name}
              </a>
            </p>
          </div>
        )
      }): <p>No attachments</p>}
    </>
  )
}


export const AddAttachments: Function = ({
    attachments: _attachments, addHandler, removeHandler
}: {
    attachments: Attachment[],
    addHandler: Function,
    removeHandler: Function
}) => {

  return(
    <div>
      <p>Attachments</p>
      <input type="file" id="attachmentInput" onChange={(evt) => {

        if ( evt.target.files ) {

          Array.from(evt.target.files).forEach((file) => {

            // early escape hatch for non image files
            if (!file.type.match('image.*')) {
              return
            }
  
            var r = new FileReader();

            r.onload = (({name}) =>
              (e) => {
                if (e.target && typeof e.target.result === "string") {
                  const newAttachment = {
                    [generateRandomInteger()]: {name, data: e.target.result}
                  }
                  addHandler(newAttachment)
                }
              }
            )(file); // scope File inside the FileReader.onload event

            r.readAsDataURL(file);        
          })
        }
      }}/>
      <AttachmentList attachments={_attachments} removeAttachment={removeHandler} />
    </div>
  )
}