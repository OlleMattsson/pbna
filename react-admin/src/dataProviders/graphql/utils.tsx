/*
    Convert the filter params from List components to valid a vaild graphql "where" variable
    The final where-variable in the graphql query has the following shape

    {
        filterField1: {contains: filterValue1}
        AND [
            filterField1: {contains: filterValue2}
            filterField1: {contains: filterValue3}
        ]
    }
*/
export function filterParamsToGraphql (filterParams) {
    let filter = {} 

    for (let key in filterParams) {

        // first filtering parameter
        if (Object.keys(filter).length < 1) {
            filter[key] = {"contains": filterParams[key]}

        // additional filtering parameters need to be contained in in an "AND" array    
        } else {
            if (!Object.hasOwn(filter, "AND")) {
                filter.AND = []
            }

            filter.AND.push(
                {[key]: {"contains": filterParams[key]}}
            )
        }
    }

    return filter
}


export function  lowercaseFirstLetter(str)  {
    if (!str) return str; // Return the original string if it's empty
    return str.charAt(0).toLowerCase() + str.slice(1);
}
