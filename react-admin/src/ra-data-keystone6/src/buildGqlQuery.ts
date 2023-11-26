import { GET_LIST, GET_MANY, GET_MANY_REFERENCE, DELETE } from 'ra-core';
import {
    QUERY_TYPES,
    IntrospectionResult,
    IntrospectedResource,
} from 'ra-data-graphql';
import {
    ArgumentNode,
    IntrospectionField,
    IntrospectionNamedTypeRef,
    IntrospectionObjectType,
    IntrospectionUnionType,
    TypeKind,
    VariableDefinitionNode,
} from 'graphql';
import * as gqlTypes from 'graphql-ast-types-browser';

import getFinalType from './getFinalType';
import { getGqlType } from './getGqlType';

export default (introspectionResults: IntrospectionResult) => (
    resource: IntrospectedResource,
    raFetchMethod: string,
    queryType: IntrospectionField,
    variables: any
) => {
    const { sortField, sortOrder, ...metaVariables } = variables;
    const apolloArgs = buildApolloArgs(queryType, variables);
    const args = buildArgs(queryType, variables);
    const metaArgs = buildArgs(queryType, metaVariables);
    const fields = buildFields(introspectionResults)(resource.type.fields);
    if (
        raFetchMethod === GET_LIST ||
        raFetchMethod === GET_MANY ||
        raFetchMethod === GET_MANY_REFERENCE
    ) {
        return gqlTypes.document([
            gqlTypes.operationDefinition(
                'query',
                gqlTypes.selectionSet([
                    gqlTypes.field(
                        gqlTypes.name(queryType.name),
                        gqlTypes.name('items'),
                        args,
                        null,
                        gqlTypes.selectionSet(fields)
                    ),
                
                gqlTypes.field(
                    gqlTypes.name(`${queryType.name}Count`),
                    gqlTypes.name('totalCount'),
                    //metaArgs,
                    null,
                    /*
                    gqlTypes.selectionSet([
                        gqlTypes.field(gqlTypes.name('accountsCount')),
                    ])
                    */
                ),               
            ]), 
                gqlTypes.name(queryType.name),
                apolloArgs
            ),
        ]);
    }

    if (raFetchMethod === DELETE) {
        return gqlTypes.document([
            gqlTypes.operationDefinition(
                'mutation',
                gqlTypes.selectionSet([
                    gqlTypes.field(
                        gqlTypes.name(queryType.name),
                        gqlTypes.name('data'),
                        args,
                        null,
                        gqlTypes.selectionSet(fields)
                    ),
                ]),
                gqlTypes.name(queryType.name),
                apolloArgs
            ),
        ]);
    }

    return gqlTypes.document([
        gqlTypes.operationDefinition(
            QUERY_TYPES.includes(raFetchMethod) ? 'query' : 'mutation',
            gqlTypes.selectionSet([
                gqlTypes.field(
                    gqlTypes.name(queryType.name),
                    gqlTypes.name('data'),
                    args,
                    null,
                    gqlTypes.selectionSet(fields)
                ),
            ]),
            gqlTypes.name(queryType.name),
            apolloArgs
        ),
    ]);
};

const buildNestedFields = (_linkedResource, existingFields, currentField, introspectionResults, level = 0) => {
    console.log("LINKED resource lvl ", level)


    if (level === 4) {
        return [...existingFields]
    }

    const fields = _linkedResource.type.fields.reduce((__acc, __field) => {
        console.log(__field.name)

        const type = getFinalType(__field.type);

        if (type.name.startsWith('_')) {
            return __acc;
        }

        if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
            return [...__acc, gqlTypes.field(gqlTypes.name(__field.name))];
        }

        const linkedResource = introspectionResults.resources.find(
            r => r.type.name === type.name
        );

        if (linkedResource) {
            console.log("Detected NESTED FIELDS", linkedResource.type.name, __field.name)
            level += 1
            return buildNestedFields(linkedResource, __acc, __field, introspectionResults, level)
        }
    
                        
        __acc.push(
             gqlTypes.field(gqlTypes.name(__field.name))
        )
        return __acc
    }, [])

    console.log("existing fields", existingFields)
    console.log("nested fields", fields)
    
   
    return [
        ...existingFields,
        gqlTypes.field(
            gqlTypes.name(currentField.name),
            null,
            null,
            null,
            gqlTypes.selectionSet([
                ...fields
            ])
        ),
    ];
}

export const buildFields = (
    introspectionResults: IntrospectionResult,
    paths = []
) => fields =>
    fields.reduce((acc, field) => {
        console.log(field.name)

        const type = getFinalType(field.type);

        if (type.name.startsWith('_')) {
            return acc;
        }

        // base case, add field to query
        if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
            return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
        }

        // check if the resource is a linked resource
        const linkedResource = introspectionResults.resources.find(
            r => r.type.name === type.name
        );
      
        /*
        
            Linked resources - ie.
            field {
                field2 {
                    ...
                }
            }
        */

        if (linkedResource) {
            return buildNestedFields(linkedResource, acc, field, introspectionResults)

            /*
            

            const fields = linkedResource.type.fields.reduce((_acc, _field) => {


                const _type = getFinalType(_field.type);
        
                if (_type.name.startsWith('_')) {
                    return _acc;
                }
        
                if (_type.kind !== TypeKind.OBJECT && _type.kind !== TypeKind.INTERFACE) {
                    return [..._acc, gqlTypes.field(gqlTypes.name(_field.name))];
                }
                       
                const nestedLinkedResource = introspectionResults.resources.find( 
                    r => r.type.name === _type.name
                );


                /* 
                Go one level deeper into the nested structure if needed.

                    field {
                        field2 {
                            field3 {

                            }
                        }
                    }
                */ 
                /*
                if (nestedLinkedResource) {
                    const nestedFields =  nestedLinkedResource.type.fields.reduce((__acc, __field) => {
                        
                        // hard coded temporary escape hatch for vatAccount since it should never refer to anything
                        // not needed when the depth is hardcode like this, it would be needed if depth was handle
                        // by recursive function calls
                        if (__field.name === "vatAccount") {
                            return _acc
                        }
                        __acc.push(
                             gqlTypes.field(gqlTypes.name(__field.name))
                        )
                        return __acc
                    }, [])
                  
                    return [
                        ..._acc,
                        gqlTypes.field(
                            gqlTypes.name(_field.name),
                            null,
                            null,
                            null,
                            gqlTypes.selectionSet([
                                ...nestedFields

                            ])
                        ),
                    ];
                    
                }
                               
                _acc.push(
                    gqlTypes.field(gqlTypes.name(_field.name))
                )

                return _acc
            }, [])
            
            
            return [
                ...acc,
                gqlTypes.field(
                    gqlTypes.name(field.name),
                    null,
                    null,
                    null,
                    gqlTypes.selectionSet([
                        ...fields
                    ])
                ),
            ];
            */


            
        }

        const linkedType = introspectionResults.types.find(
            t => t.name === type.name
        );

        if (linkedType && !paths.includes(linkedType.name)) {
            const possibleTypes =
                (linkedType as IntrospectionUnionType).possibleTypes || [];
            return [
                ...acc,
                gqlTypes.field(
                    gqlTypes.name(field.name),
                    null,
                    null,
                    null,
                    gqlTypes.selectionSet([
                        ...buildFragments(introspectionResults)(possibleTypes),
                        ...buildFields(introspectionResults, [
                            ...paths,
                            linkedType.name,
                        ])((linkedType as IntrospectionObjectType).fields),
                    ])
                ),
            ];
        }

        // NOTE: We might have to handle linked types which are not resources but will have to be careful about
        // ending with endless circular dependencies
        return acc;
    }, []);




export const buildFragments = (introspectionResults: IntrospectionResult) => (
    possibleTypes: readonly IntrospectionNamedTypeRef<IntrospectionObjectType>[]
) =>
    possibleTypes.reduce((acc, possibleType) => {
        const type = getFinalType(possibleType);

        const linkedType = introspectionResults.types.find(
            t => t.name === type.name
        );

        return [
            ...acc,
            gqlTypes.inlineFragment(
                gqlTypes.selectionSet(
                    buildFields(introspectionResults)(
                        (linkedType as IntrospectionObjectType).fields
                    )
                ),
                gqlTypes.namedType(gqlTypes.name(type.name))
            ),
        ];
    }, []);

export const buildArgs = (
    query: IntrospectionField,
    variables: any
): ArgumentNode[] => {
    if (query.args.length === 0) {
        return [];
    }

    const validVariables = Object.keys(variables).filter(
        k => typeof variables[k] !== 'undefined'
    );
    let args = query.args
        .filter(a => validVariables.includes(a.name))
        .reduce(
            (acc, arg) => [
                ...acc,
                gqlTypes.argument(
                    gqlTypes.name(arg.name),
                    gqlTypes.variable(gqlTypes.name(arg.name))
                ),
            ],
            []
        );

    return args;
};

export const buildApolloArgs = (
    query: IntrospectionField,
    variables: any
): VariableDefinitionNode[] => {
    if (query.args.length === 0) {
        return [];
    }

    const validVariables = Object.keys(variables).filter(
        k => typeof variables[k] !== 'undefined'
    );

    let args = query.args
        .filter(a => validVariables.includes(a.name))
        .reduce((acc, arg) => {
            return [
                ...acc,
                gqlTypes.variableDefinition(
                    gqlTypes.variable(gqlTypes.name(arg.name)),
                    getGqlType(arg.type)
                ),
            ];
        }, []);

    return args;
};
