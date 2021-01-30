import React from 'react';
import { getComponentObject } from '../../util/helper';

export default ({ response, statusCode }) => {
    const { description, content } = response;
    let obj;

    if (content && content["application/json"]) {
        const { schema } = content['application/json'];
        if (schema) {
            const { $ref } = schema;
            if ($ref) {
                const arr = $ref.split('/');
                const componentName = arr[arr.length - 1];
                obj = getComponentObject(componentName);
            } else {
                obj = schema;
            }
        }
    }

    return (
        <div>
            <div>
                <strong>Status Code: {statusCode}</strong>
            </div>
            <p>
                <strong>Description: </strong>
                {description}
            </p>
            <div>
                {obj && 
                    <pre>{JSON.stringify(obj, null, 2)}</pre>
                }
            </div>
            <hr />
        </div>
    );
};
