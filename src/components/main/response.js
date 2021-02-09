import React from 'react';
import { getComponentObject } from '../../util/helper';
import getResponse from '../../util/getResponse';

export default ({ response, statusCode }) => {
    const { description, content } = response;
    let obj;

    if (content && content['application/json']) {
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

    /************** export fn **************/
    const res = getResponse(response);
    /************** End export fn **************/

    return (
        <div>
            <div>
                <strong>Status Code: {statusCode}</strong>
            </div>
            <p>
                <strong>Description: </strong>
                {description}
            </p>
            <div>{res && <pre>{JSON.stringify(res, null, 2)}</pre>}</div>
            <hr />
            <div>
                <div>old:</div>
                <div>{obj && <pre>{JSON.stringify(obj, null, 2)}</pre>}</div>
            </div>
        </div>
    );
};
