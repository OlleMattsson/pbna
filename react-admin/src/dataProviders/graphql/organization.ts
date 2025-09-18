/**
 * Organization
 */

export function organization({raFetchType, builtQuery, params}) {
    switch(raFetchType) {
        case "UPDATE": {
            const variables = builtQuery.variables;
            delete variables.data.id
            delete variables.data.usersCount
            delete variables.data.owner
            delete variables.data["owner.id"]
            delete variables.data.users

            return {
                ...builtQuery,
                variables
            }
        }
        default: {
            return builtQuery
        }   
    }
}