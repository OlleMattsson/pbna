import { gql } from "@apollo/client"

export const VERIFY_INVITATION = gql`
    mutation VerifyInvitation($data: verifyInvitationInput!) {
        verifyInvitation(data: $data)
    }            
`