import React, { useState } from 'react';
import { getComponentObject } from '../../util/helper';
import getExampleValue, {
    getSchemaProperties,
    propMapping,
} from '../../util/getExampleValue';

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
    const res = getExampleValue(response);

    const schema2 = getSchemaProperties(response);
    let mappedProperties;
    if (
        schema2 &&
        Object.prototype.hasOwnProperty.call(schema2, 'properties')
    ) {
        const { properties } = schema2;
        mappedProperties = propMapping(properties);
    }

    const [displaySchema, setDisplaySchema] = useState(true);
    const handleClick = (v) => {
        setDisplaySchema(v);
    };

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
            {res && (
                <div>
                    <strong>Example</strong>
                    <pre>{JSON.stringify(res, null, 2)}</pre>
                </div>
            )}
            <hr />
            <div>
                <div>old:</div>
                <div>{obj && <pre>{JSON.stringify(obj, null, 2)}</pre>}</div>
            </div>

            <div
                style={{
                    border: '1px solid #eee',
                    padding: '6px 15px',
                    marginTop: '1rem',
                }}>
                <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <span
                        style={{
                            marginRight: '1rem',
                            fontSize: '0.875rem',
                            color: displaySchema ? '#3b99fc' : '#999',
                            fontWeight: displaySchema ? 'bold' : 'normal',
                            opacity: displaySchema ? '1' : '0.6',
                            cursor: displaySchema ? 'default' : 'pointer',
                        }}
                        onClick={() => handleClick(true)}>
                        Schema
                    </span>
                    <span
                        style={{
                            marginRight: '1rem',
                            fontSize: '0.875rem',
                            color: !displaySchema ? '#3b99fc' : '#999',
                            fontWeight: !displaySchema ? 'bold' : 'normal',
                            opacity: !displaySchema ? '1' : '0.6',
                            cursor: !displaySchema ? 'default' : 'pointer',
                        }}
                        onClick={() => handleClick(false)}>
                        Example
                    </span>
                </div>
                {schema2 &&
                    Object.prototype.hasOwnProperty.call(
                        schema2,
                        'properties'
                    ) && (
                        <div
                            style={{
                                marginTop: '0.5rem',
                                marginBottom: '1rem',
                                display: displaySchema ? 'block' : 'none',
                            }}>
                            <div>
                                <div>
                                    <small>
                                        Type:{' '}
                                        <span
                                            className={`cell--${schema2.type}`}>
                                            {schema2.type}
                                        </span>
                                    </small>
                                </div>
                            </div>
                            {mappedProperties && (
                                <ul>
                                    {mappedProperties.map((item) => {
                                        return (
                                            <li key={item.name}>
                                                <div>
                                                    <small>
                                                        {item.name}&nbsp;
                                                        <span
                                                            className={`cell--${item.type}`}>{`(${item.type})`}</span>
                                                    </small>
                                                    {Object.prototype.hasOwnProperty.call(
                                                        item,
                                                        'properties'
                                                    ) && (
                                                        <ul>
                                                            {item.properties.map(
                                                                (subItem) => (
                                                                    <li
                                                                        key={
                                                                            subItem.name
                                                                        }>
                                                                        <small>
                                                                            {
                                                                                subItem.name
                                                                            }
                                                                            &nbsp;
                                                                            <span
                                                                                className={`cell--${subItem.type}`}>{`(${subItem.type})`}</span>
                                                                        </small>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                {res && (
                    <div
                        style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            display: displaySchema ? 'none' : 'block',
                        }}>
                        <pre>{JSON.stringify(res, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};
