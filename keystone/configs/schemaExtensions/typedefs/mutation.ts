export const mutationTypeDefs = `
type Mutation {
    verifyInvitation(
        data: verifyInvitationInput!
    ): String

    runOrchestrator(name: String!): String 
}

input verifyInvitationInput {
    password: String!
    invitationToken: String!
}

`