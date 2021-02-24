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

function getSchemaProperties(response) {
    let schema = getParentSchema(response);
    return getProperties(schema);
}

function getProperties(schema) {
    if (schema === undefined) {
        return;
    }

    // 1. If "example" exists
    let $ref; // It is a string, pointing to a reference schema

    if (Object.prototype.hasOwnProperty.call(schema, '$ref')) {
        $ref = schema.$ref;
        schema = getSchemaObjectByRef($ref);
        if (Object.prototype.hasOwnProperty.call(schema, '$ref')) {
            return getProperties(schema);
        }
    }

    // 2. If "properties" exist
    if (Object.prototype.hasOwnProperty.call(schema, 'properties')) {
        let { properties, type, required } = schema;
        const keys = Object.keys(properties);
        keys.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(properties[key], '$ref')) {
                $ref = properties[key].$ref;
                schema = getSchemaObjectByRef($ref);
                const newProps = getProperties(schema);
                properties[key] = newProps;
            } else if (
                Object.prototype.hasOwnProperty.call(properties[key], 'items') &&
                properties[key].type === 'array'
            ) {
                if (Object.prototype.hasOwnProperty.call(properties[key].items, '$ref')) {
                    $ref = properties[key].items.$ref;
                    schema = getSchemaObjectByRef($ref);
                    const newProps = getProperties(schema);
                    properties[key] = newProps;
                }
            }
        });

        return {
            properties,
            type,
            required,
        };
    }

    if (Object.prototype.hasOwnProperty.call(schema, 'allOf')) {
        return schema.allOf.reduce((accumulator, currentItem) => {
            $ref = currentItem.$ref;
            let nextSchema = getSchemaObjectByRef($ref);
            const temp = getProperties(nextSchema);
            return { ...accumulator, ...temp };
        }, []);
    }

    return schema;
}

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
            if (properties[currentKey].type === 'array' && properties[currentKey].items !== undefined) {
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

/**
 * Put properties in an array
 * @param {object} properties
 * @return {Array}
 */
function propMapping(properties) {
    const result = Object.keys(properties).map((key) => {
        const obj = {
            name: key,
            type: properties[key].type,
        };
        if (Object.prototype.hasOwnProperty.call(properties[key], 'properties')) {
            const tmp = propMapping(properties[key].properties);
            return { ...obj, properties: tmp };
        }
        return obj;
    });

    return result;
}

export { getSchemaProperties, propMapping };
