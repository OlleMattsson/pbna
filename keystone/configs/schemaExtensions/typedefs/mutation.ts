export const mutationTypeDefs = `
type Mutation {
    verifyInvitation(
        data: verifyInvitationInput!
    ): String
}

input verifyInvitationInput {
    password: String!
    invitationToken: String!
}

`