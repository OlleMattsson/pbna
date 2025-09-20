import { gql } from '@apollo/client';
import { client } from '../apolloClient';

export const attachmentDataProvider = {
  /* 
    TODO: the correct usage of create() is to create and return one and only one resource

    Here a graphql mutation is used that uploads one or more files

    Creating multiple files in one go should be implemented outside create()
  */
  create: async (resource, params) => {
    return await client
      .mutate({
        mutation: UPLOAD_FILES_MUTATION,
        variables: params,
      })
      .then((r) => {
        /**
          A slight hack is done here for now, the response of the create function is expected to have the format
          { data: { id: 123, ... } }

          If the response is not in this format, the dataprovider throws an error in the console :(
          */
        const responseObject = {
          data: {
            id: 1, // we assign a dummy id here that won't be used for anything
            attachments: r.data.createAttachments, // here are the actual attachmentIds
          },
        };

        return responseObject;
      })
      .catch((e) => {
        console.log('graphql error', e);
        return { data: {}, total: 0 };
      });
  },

  deleteMany: async (resource, params) => {
    const { attachments } = params;

    await Promise.all(
      attachments.map(async (attachment) => {
        return await client.mutate({
          mutation: DELETE_ATTACHMENT_MUTATION,
          variables: {
            where: {
              id: attachment.id,
            },
          },
        });
      })
    );

    return { data: [] };
  },
};

const UPLOAD_FILES_MUTATION = gql`
  mutation createAttachments($data: [AttachmentCreateInput!]!) {
    createAttachments(data: $data) {
      id
    }
  }
`;

const DELETE_ATTACHMENT_MUTATION = gql`
  mutation DeleteAttachment($where: AttachmentWhereUniqueInput!) {
    deleteAttachment(where: $where) {
      id
    }
  }
`;
