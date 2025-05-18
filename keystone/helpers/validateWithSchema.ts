import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

/**
 * Validate data against a JSON Schema.
 * @param {object} schema - JSON Schema object
 * @param {object} data - Data to validate
 * @returns {null|object[]} Null if valid, or array of errors if invalid
 */
export function validateWithSchema(schema: object, data: object): null | object[] {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) return null;
    return validate.errors || [];
}