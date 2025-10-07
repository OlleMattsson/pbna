/*
    Get attachment from ID

    This little tool or "agent" receives an attachmentID
    and and retrieves the filename which it outputs to the context.

Input schema 

{
  "type": "object",
  "required": [
    "attachmentId"
  ],
  "properties": {
    "attachmentId": {
      "type": "string"
    }
  }
}
output schema

{
  "type": "object",
  "required": [
    "attachmentFilename"
  ],
  "properties": {
    "attachmentFilename": {
      "type": "string"
    }
  }
}

*/

import { agentRunner } from "../agentRunner";

export async function getAttachmentFromId(
  agent,
  input,
  context,
  agentOutputId
) {
  const executor = async ({ agent, input, context }) => {
    // input is validated and guaranteed
    const { attachmentId } = input;

    console.log("[getAttachmentFromId] ", input);

    const attachment = await context.query.Attachment.findOne({
      where: { id: attachmentId },
      query: "file { filename }",
    });

    const attachmentFilename = attachment.file.filename;

    console.log("[getAttachmentFromId] retrieved file: ", attachmentFilename);

    return attachmentFilename;
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
