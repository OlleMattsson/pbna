export default
{
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "User",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "email",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "password",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "PasswordState",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createdAt",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "role",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organizations",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OrganizationOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Organization",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organizationsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "ID",
        "description": "The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"4\"`) or integer (such as `4`) input value will be accepted as an ID.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "String",
        "description": "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "PasswordState",
        "description": null,
        "fields": [
          {
            "name": "isSet",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "Boolean",
        "description": "The `Boolean` scalar type represents `true` or `false`.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "DateTime",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "Int",
        "description": "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "role",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organizations",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationManyRelationFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IDFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "contains",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startsWith",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endsWith",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "mode",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "QueryMode",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "QueryMode",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "default",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "insensitive",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedStringFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "contains",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startsWith",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endsWith",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateTimeNullableFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "DateTime",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "DateTime",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationManyRelationFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "every",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "some",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "none",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "role",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "OrderDirection",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "asc",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "desc",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "password",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "role",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organizations",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToManyForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationRelateToManyForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "set",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UserWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "UserUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "password",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "role",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organizations",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToManyForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationRelateToManyForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Entry",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createdAt",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createdBy",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "owner",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "date",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "entryNumber",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "lineItems",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "LineItemOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "LineItem",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "lineItemsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "attachments",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttachmentOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Attachment",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "attachmentsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "CalendarDay",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EntryWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EntryWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EntryWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "entryNumber",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lineItems",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemManyRelationFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "attachments",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentManyRelationFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateTimeFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "DateTime",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "DateTime",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CalendarDayFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "CalendarDay",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "CalendarDay",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IntFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemManyRelationFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "every",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "some",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "none",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentManyRelationFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "every",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "some",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "none",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "entryNumber",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "entryNumber",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lineItems",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemRelateToManyForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "attachments",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentRelateToManyForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserRelateToOneForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationRelateToOneForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemRelateToManyForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "set",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentRelateToManyForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "set",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "EntryWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "EntryUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EntryCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "entryNumber",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lineItems",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "LineItemRelateToManyForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "attachments",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttachmentRelateToManyForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserRelateToOneForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationRelateToOneForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemRelateToManyForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentRelateToManyForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "LineItem",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createdAt",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createdBy",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "owner",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "date",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "account",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "type",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "amount",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "Decimal",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateTimeFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "amount",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DecimalFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CalendarDayNullableFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "CalendarDay",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "CalendarDay",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DecimalFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Decimal",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Decimal",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DecimalFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "amount",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "amount",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountRelateToOneForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "LineItemWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "LineItemUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "LineItemCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "createdAt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "createdBy",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "date",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "amount",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountRelateToOneForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Attachment",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "file",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "FileFieldOutput",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ocrData",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Attachment_ocrData_Document",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ocrStatus",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "extractedData",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "dataExtractionStatus",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "FileFieldOutput",
        "description": null,
        "fields": [
          {
            "name": "filename",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "filesize",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "url",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Attachment_ocrData_Document",
        "description": null,
        "fields": [
          {
            "name": "document",
            "description": null,
            "args": [
              {
                "name": "hydrateRelationships",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  }
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "JSON",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrStatus",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "extractedData",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "dataExtractionStatus",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrStatus",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "extractedData",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "dataExtractionStatus",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "file",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FileFieldInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrData",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrStatus",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "extractedData",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "dataExtractionStatus",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FileFieldInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "upload",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Upload",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "Upload",
        "description": "The `Upload` scalar type represents a file upload.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttachmentWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttachmentUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttachmentCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "file",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FileFieldInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrData",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "ocrStatus",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "extractedData",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "dataExtractionStatus",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "AccountChart",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accounts",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Account",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountChartWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountChartWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountChartWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accounts",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountManyRelationFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountManyRelationFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "every",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "some",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "none",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accounts",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToManyForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountRelateToManyForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "set",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountChartWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountChartUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accounts",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToManyForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountRelateToManyForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Account",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "account",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "type",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "vatAmount",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "vatAccount",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAmount",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DecimalNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAccount",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IntNullableFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DecimalNullableFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "equals",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "in",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Decimal",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "notIn",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Decimal",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "lt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "lte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gt",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "gte",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "not",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DecimalNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAmount",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAmount",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAccount",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "account",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "description",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "type",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAmount",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Decimal",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatAccount",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "AccountingPeriod",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "label",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organization",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountChart",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "AccountChart",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "startDate",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "endDate",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountingPeriodWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountingPeriodWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountingPeriodWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "label",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organization",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accountChart",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startDate",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endDate",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CalendarDayNullableFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "label",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startDate",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endDate",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "label",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organization",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accountChart",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startDate",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endDate",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartRelateToOneForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountingPeriodWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AccountingPeriodUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountingPeriodCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "label",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "organization",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrganizationRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "accountChart",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "startDate",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "endDate",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "CalendarDay",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountChartRelateToOneForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountChartWhereUniqueInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Organization",
        "description": null,
        "fields": [
          {
            "name": "id",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "addressStreet",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "addressPostalCode",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "addressCity",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "addressCountry",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "phone",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "email",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "website",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "businessID",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "vatNumber",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "owner",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "users",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "UserOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "usersCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationWhereUniqueInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationWhereInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "AND",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "OR",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "NOT",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressStreet",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressPostalCode",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCity",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCountry",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "phone",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "website",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "businessID",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatNumber",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "users",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserManyRelationFilter",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserManyRelationFilter",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "every",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "some",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "none",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserWhereInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationOrderByInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "id",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressStreet",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressPostalCode",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCity",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCountry",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "phone",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "website",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "businessID",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatNumber",
            "description": null,
            "type": {
              "kind": "ENUM",
              "name": "OrderDirection",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressStreet",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressPostalCode",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCity",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCountry",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "phone",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "website",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "businessID",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatNumber",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "users",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToManyForUpdateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserRelateToManyForUpdateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "disconnect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "set",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationUpdateArgs",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "where",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "OrganizationWhereUniqueInput",
                "ofType": null
              }
            },
            "defaultValue": null
          },
          {
            "name": "data",
            "description": null,
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "OrganizationUpdateInput",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrganizationCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "name",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressStreet",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressPostalCode",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCity",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "addressCountry",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "phone",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "email",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "website",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "businessID",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "vatNumber",
            "description": null,
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "owner",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToOneForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          },
          {
            "name": "users",
            "description": null,
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UserRelateToManyForCreateInput",
              "ofType": null
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserRelateToManyForCreateInput",
        "description": null,
        "fields": null,
        "inputFields": [
          {
            "name": "create",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserCreateInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          },
          {
            "name": "connect",
            "description": null,
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                }
              }
            },
            "defaultValue": null
          }
        ],
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "SCALAR",
        "name": "JSON",
        "description": "The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "description": null,
        "fields": [
          {
            "name": "createUser",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createUsers",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "UserCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateUser",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateUsers",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "UserUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteUser",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteUsers",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "UserWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createEntry",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Entry",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createEntries",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "EntryCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Entry",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateEntry",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Entry",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateEntries",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "EntryUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Entry",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteEntry",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Entry",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteEntries",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "EntryWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Entry",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createLineItem",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "LineItem",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createLineItems",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "LineItemCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "LineItem",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateLineItem",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "LineItem",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateLineItems",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "LineItemUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "LineItem",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteLineItem",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "LineItem",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteLineItems",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "LineItemWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "LineItem",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAttachment",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Attachment",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAttachments",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttachmentCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Attachment",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAttachment",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Attachment",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAttachments",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttachmentUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Attachment",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAttachment",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Attachment",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAttachments",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttachmentWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Attachment",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccountChart",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountChart",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccountCharts",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountChartCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountChart",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccountChart",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountChart",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccountCharts",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountChartUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountChart",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccountChart",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountChart",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccountCharts",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountChartWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountChart",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccount",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccounts",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccounts",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccounts",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccountingPeriod",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountingPeriod",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createAccountingPeriods",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountingPeriodCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountingPeriod",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccountingPeriod",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountingPeriod",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateAccountingPeriods",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountingPeriodUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountingPeriod",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccountingPeriod",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountingPeriod",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteAccountingPeriods",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountingPeriodWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountingPeriod",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createOrganization",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationCreateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createOrganizations",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OrganizationCreateInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Organization",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateOrganization",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              },
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationUpdateInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "updateOrganizations",
            "description": null,
            "args": [
              {
                "name": "data",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OrganizationUpdateArgs",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Organization",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteOrganization",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deleteOrganizations",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OrganizationWhereUniqueInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "Organization",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "description": null,
        "fields": [
          {
            "name": "users",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "UserOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "user",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "usersCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UserWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "entries",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "EntryOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EntryWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Entry",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "entry",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Entry",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "entriesCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EntryWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "lineItems",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "LineItemOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "LineItemWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "LineItem",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "lineItem",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "LineItem",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "lineItemsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "LineItemWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "attachments",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttachmentOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttachmentWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Attachment",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "attachment",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Attachment",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "attachmentsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttachmentWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountCharts",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountChartOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountChartWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AccountChart",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountChart",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountChart",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountChartsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountChartWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accounts",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Account",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "account",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Account",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountingPeriods",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AccountingPeriodOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountingPeriodWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AccountingPeriod",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountingPeriod",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "AccountingPeriod",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "accountingPeriodsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountingPeriodWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organizations",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              },
              {
                "name": "orderBy",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "LIST",
                    "name": null,
                    "ofType": {
                      "kind": "NON_NULL",
                      "name": null,
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OrganizationOrderByInput",
                        "ofType": null
                      }
                    }
                  }
                },
                "defaultValue": "[]"
              },
              {
                "name": "take",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                },
                "defaultValue": null
              },
              {
                "name": "skip",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                },
                "defaultValue": "0"
              },
              {
                "name": "cursor",
                "description": null,
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrganizationWhereUniqueInput",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Organization",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organization",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereUniqueInput",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "Organization",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "organizationsCount",
            "description": null,
            "args": [
              {
                "name": "where",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OrganizationWhereInput",
                    "ofType": null
                  }
                },
                "defaultValue": "{}"
              }
            ],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "keystone",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "KeystoneMeta",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneMeta",
        "description": null,
        "fields": [
          {
            "name": "adminMeta",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "KeystoneAdminMeta",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminMeta",
        "description": null,
        "fields": [
          {
            "name": "lists",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "KeystoneAdminUIListMeta",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "list",
            "description": null,
            "args": [
              {
                "name": "key",
                "description": null,
                "type": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "KeystoneAdminUIListMeta",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIListMeta",
        "description": null,
        "fields": [
          {
            "name": "key",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "itemQueryName",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "listQueryName",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "hideCreate",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "hideDelete",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "path",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "label",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "singular",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "plural",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "initialColumns",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "pageSize",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "labelField",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "fields",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "KeystoneAdminUIFieldMeta",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "groups",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "KeystoneAdminUIFieldGroupMeta",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "initialSort",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "KeystoneAdminUISort",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isHidden",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isSingleton",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIFieldMeta",
        "description": null,
        "fields": [
          {
            "name": "path",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "label",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isOrderable",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isFilterable",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isNonNull",
            "description": null,
            "args": [],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "ENUM",
                  "name": "KeystoneAdminUIFieldMetaIsNonNull",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "fieldMeta",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "viewsIndex",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "customViewsIndex",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "createView",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "KeystoneAdminUIFieldMetaCreateView",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "listView",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "KeystoneAdminUIFieldMetaListView",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "itemView",
            "description": null,
            "args": [
              {
                "name": "id",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "ID",
                  "ofType": null
                },
                "defaultValue": null
              }
            ],
            "type": {
              "kind": "OBJECT",
              "name": "KeystoneAdminUIFieldMetaItemView",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "search",
            "description": null,
            "args": [],
            "type": {
              "kind": "ENUM",
              "name": "QueryMode",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUIFieldMetaIsNonNull",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "read",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "create",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "update",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIFieldMetaCreateView",
        "description": null,
        "fields": [
          {
            "name": "fieldMode",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "ENUM",
                "name": "KeystoneAdminUIFieldMetaCreateViewFieldMode",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUIFieldMetaCreateViewFieldMode",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "edit",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "hidden",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIFieldMetaListView",
        "description": null,
        "fields": [
          {
            "name": "fieldMode",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "ENUM",
                "name": "KeystoneAdminUIFieldMetaListViewFieldMode",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUIFieldMetaListViewFieldMode",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "read",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "hidden",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIFieldMetaItemView",
        "description": null,
        "fields": [
          {
            "name": "fieldMode",
            "description": null,
            "args": [],
            "type": {
              "kind": "ENUM",
              "name": "KeystoneAdminUIFieldMetaItemViewFieldMode",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "fieldPosition",
            "description": null,
            "args": [],
            "type": {
              "kind": "ENUM",
              "name": "KeystoneAdminUIFieldMetaItemViewFieldPosition",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUIFieldMetaItemViewFieldMode",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "edit",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "read",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "hidden",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUIFieldMetaItemViewFieldPosition",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "form",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "sidebar",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUIFieldGroupMeta",
        "description": null,
        "fields": [
          {
            "name": "label",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "fields",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "KeystoneAdminUIFieldMeta",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "KeystoneAdminUISort",
        "description": null,
        "fields": [
          {
            "name": "field",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "direction",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "ENUM",
                "name": "KeystoneAdminUISortDirection",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "KeystoneAdminUISortDirection",
        "description": null,
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "ASC",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "DESC",
            "description": null,
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__Schema",
        "description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
        "fields": [
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "types",
            "description": "A list of all types supported by this server.",
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Type",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "queryType",
            "description": "The type that query operations will be rooted at.",
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "mutationType",
            "description": "If this server supports mutation, the type that mutation operations will be rooted at.",
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "__Type",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "subscriptionType",
            "description": "If this server support subscription, the type that subscription operations will be rooted at.",
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "__Type",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "directives",
            "description": "A list of all directives supported by this server.",
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Directive",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__Type",
        "description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
        "fields": [
          {
            "name": "kind",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "ENUM",
                "name": "__TypeKind",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "specifiedByURL",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "fields",
            "description": null,
            "args": [
              {
                "name": "includeDeprecated",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Field",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "interfaces",
            "description": null,
            "args": [],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "possibleTypes",
            "description": null,
            "args": [],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "enumValues",
            "description": null,
            "args": [
              {
                "name": "includeDeprecated",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__EnumValue",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "inputFields",
            "description": null,
            "args": [
              {
                "name": "includeDeprecated",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "LIST",
              "name": null,
              "ofType": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__InputValue",
                  "ofType": null
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ofType",
            "description": null,
            "args": [],
            "type": {
              "kind": "OBJECT",
              "name": "__Type",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "__TypeKind",
        "description": "An enum describing what kind of type a given `__Type` is.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "SCALAR",
            "description": "Indicates this type is a scalar.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "OBJECT",
            "description": "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INTERFACE",
            "description": "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "UNION",
            "description": "Indicates this type is a union. `possibleTypes` is a valid field.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ENUM",
            "description": "Indicates this type is an enum. `enumValues` is a valid field.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INPUT_OBJECT",
            "description": "Indicates this type is an input object. `inputFields` is a valid field.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "LIST",
            "description": "Indicates this type is a list. `ofType` is a valid field.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "NON_NULL",
            "description": "Indicates this type is a non-null. `ofType` is a valid field.",
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__Field",
        "description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
        "fields": [
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "args",
            "description": null,
            "args": [
              {
                "name": "includeDeprecated",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "type",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isDeprecated",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deprecationReason",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__InputValue",
        "description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
        "fields": [
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "type",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "defaultValue",
            "description": "A GraphQL-formatted string representing the default value for this input value.",
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isDeprecated",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deprecationReason",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__EnumValue",
        "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
        "fields": [
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isDeprecated",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "deprecationReason",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "OBJECT",
        "name": "__Directive",
        "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
        "fields": [
          {
            "name": "name",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "description",
            "description": null,
            "args": [],
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "isRepeatable",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "locations",
            "description": null,
            "args": [],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "ENUM",
                    "name": "__DirectiveLocation",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "args",
            "description": null,
            "args": [
              {
                "name": "includeDeprecated",
                "description": null,
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                },
                "defaultValue": "false"
              }
            ],
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue",
                    "ofType": null
                  }
                }
              }
            },
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "inputFields": null,
        "interfaces": [],
        "enumValues": null,
        "possibleTypes": null
      },
      {
        "kind": "ENUM",
        "name": "__DirectiveLocation",
        "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
        "fields": null,
        "inputFields": null,
        "interfaces": null,
        "enumValues": [
          {
            "name": "QUERY",
            "description": "Location adjacent to a query operation.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "MUTATION",
            "description": "Location adjacent to a mutation operation.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "SUBSCRIPTION",
            "description": "Location adjacent to a subscription operation.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "FIELD",
            "description": "Location adjacent to a field.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "FRAGMENT_DEFINITION",
            "description": "Location adjacent to a fragment definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "FRAGMENT_SPREAD",
            "description": "Location adjacent to a fragment spread.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INLINE_FRAGMENT",
            "description": "Location adjacent to an inline fragment.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "VARIABLE_DEFINITION",
            "description": "Location adjacent to a variable definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "SCHEMA",
            "description": "Location adjacent to a schema definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "SCALAR",
            "description": "Location adjacent to a scalar definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "OBJECT",
            "description": "Location adjacent to an object type definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "FIELD_DEFINITION",
            "description": "Location adjacent to a field definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ARGUMENT_DEFINITION",
            "description": "Location adjacent to an argument definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INTERFACE",
            "description": "Location adjacent to an interface definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "UNION",
            "description": "Location adjacent to a union definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ENUM",
            "description": "Location adjacent to an enum definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "ENUM_VALUE",
            "description": "Location adjacent to an enum value definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INPUT_OBJECT",
            "description": "Location adjacent to an input object type definition.",
            "isDeprecated": false,
            "deprecationReason": null
          },
          {
            "name": "INPUT_FIELD_DEFINITION",
            "description": "Location adjacent to an input object field definition.",
            "isDeprecated": false,
            "deprecationReason": null
          }
        ],
        "possibleTypes": null
      }
    ],
    "directives": [
      {
        "name": "include",
        "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
        "locations": [
          "FIELD",
          "FRAGMENT_SPREAD",
          "INLINE_FRAGMENT"
        ],
        "args": [
          {
            "name": "if",
            "description": "Included when true.",
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ]
      },
      {
        "name": "skip",
        "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
        "locations": [
          "FIELD",
          "FRAGMENT_SPREAD",
          "INLINE_FRAGMENT"
        ],
        "args": [
          {
            "name": "if",
            "description": "Skipped when true.",
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ]
      },
      {
        "name": "deprecated",
        "description": "Marks an element of a GraphQL schema as no longer supported.",
        "locations": [
          "FIELD_DEFINITION",
          "ARGUMENT_DEFINITION",
          "INPUT_FIELD_DEFINITION",
          "ENUM_VALUE"
        ],
        "args": [
          {
            "name": "reason",
            "description": "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "defaultValue": "\"No longer supported\""
          }
        ]
      },
      {
        "name": "specifiedBy",
        "description": "Exposes a URL that specifies the behavior of this scalar.",
        "locations": [
          "SCALAR"
        ],
        "args": [
          {
            "name": "url",
            "description": "The URL that specifies the behavior of this scalar.",
            "type": {
              "kind": "NON_NULL",
              "name": null,
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "defaultValue": null
          }
        ]
      }
    ]
  }
}
