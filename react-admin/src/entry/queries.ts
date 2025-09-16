import { getActiveAccountingPeriod } from './gql';
import { apolloClient } from './apolloClient';

export const getAccountingPeriodId = () => apolloClient.query({  
    query: getActiveAccountingPeriod,
    variables: {
        where: {
            isActive: {
                equals: true
            }
        }
    }
}).then(r => {
    return r.data?.accountingPeriods[0]?.id || null
}).catch(e => {
    console.log("error", e)
    return null
});
    