import data from '../../data/api.json';

/**
 * Return the example value by response or requestBody object
 * @param {Object} response
 * @return {string|Object\Array}
 */
export default (response) => {
    const objectSchema = getParentSchema(response);
    const exampleValue = getExampleResponseValue(objectSchema);
    return exampleValue;
};

/**
 * Return the top parent schema
 * @param {Object} response
 * @return {Object}
 */
function getParentSchema(response) {
    if (response.content === undefined) {
        return;
    }
    const { schema } = response.content['application/json'];
    return schema;
}

/**
 * Return the example response value via the schema object. The function involves recursive calls.
 * @param {Object} schema
 * @return {string|Object|Array}
 */
function getExampleResponseValue(schema) {
    if (schema === undefined) {
        return;
    }

    let result = {};

    // 1. If "example" exists
    if (schema.example !== undefined) {
        return schema.example;
    }

    let $ref, // It is a string, pointing to a reference schema
        nextSchema; // The parent schema may contain the "$ref" property, referring to a schema

    if (schema.items !== undefined) {
        if (schema.items.$ref !== undefined) {
            $ref = schema.items.$ref;
            nextSchema = getSchemaObjectByRef($ref);
            return [getExampleResponseValue(nextSchema)];
        }
    }

    if (schema.$ref !== undefined) {
        $ref = schema.$ref;
        nextSchema = getSchemaObjectByRef($ref);
        return getExampleResponseValue(nextSchema);
    }

    // 2. If "properties" exist
    if (schema.properties && schema.properties !== undefined) {
        const { properties } = schema;
        const keys = Object.keys(properties);

        return keys.reduce((accumulator, currentKey) => {
            let temp = {};
            // 2a. If "example" exists
            if (properties[currentKey].example !== undefined) {
                temp[currentKey] = properties[currentKey].example;
            }

            // 2b. If "$ref" exists
            if (properties[currentKey].$ref !== undefined) {
                $ref = properties[currentKey].$ref;
                nextSchema = getSchemaObjectByRef($ref);
                temp[currentKey] = getExampleResponseValue(nextSchema);
            }

            // 2c. If "items" exists
            if (
                properties[currentKey].type === 'array' &&
                properties[currentKey].items !== undefined
            ) {
                if (properties[currentKey].items.$ref !== undefined) {
                    $ref = properties[currentKey].items.$ref;
                    nextSchema = getSchemaObjectByRef($ref);
                    temp[currentKey] = [getExampleResponseValue(nextSchema)];
                }
            }

            return Object.assign(result, accumulator, temp);
        }, []);
    }

    // 3. If "allOf" exists
    if (schema.allOf && schema.allOf !== undefined) {
        return schema.allOf.reduce((accumulator, currentItem) => {
            $ref = currentItem.$ref;
            nextSchema = getSchemaObjectByRef($ref);
            const temp = getExampleResponseValue(nextSchema);
            return { ...accumulator, ...temp };
        }, []);
    }

    return result;
}

/**
 * Return the schema object by $ref
 * @param {string} $ref
 * @return {Object}
 */
function getSchemaObjectByRef($ref) {
    const arr = $ref.split('/');
    const componentName = arr[arr.length - 1];

    const { components } = data;
    return components.schemas[componentName];
}
