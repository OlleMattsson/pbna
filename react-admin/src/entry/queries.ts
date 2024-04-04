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
}).then(r => r.data.accountingPeriods[0].id)