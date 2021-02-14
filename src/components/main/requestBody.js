import React from 'react';
import getExampleValue from '../../util/getExampleValue';

export default ({ requestBody }) => {
    const { description } = requestBody;
    const res = getExampleValue(requestBody);
    return (
        <div>
            <h3>Request Body</h3>
            {description && <div>{description}</div>}
            <div>{res && <pre>{JSON.stringify(res, null, 2)}</pre>}</div>
        </div>
    );
};
