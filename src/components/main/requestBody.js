import React, { useState } from 'react';
import getExampleValue, {
    getSchemaProperties,
} from '../../util/getExampleValue';

export default ({ requestBody }) => {
    const { description } = requestBody;
    const res = getExampleValue(requestBody);

    const schema = getSchemaProperties(requestBody);
    const { properties, type, required } = schema;

    const mappedProperties = propMapping(properties);

    const [displaySchema, setDisplaySchema] = useState(true);

    const handleClick = (v) => {
        setDisplaySchema(v);
    };

    return (
        <div>
            <h3>Request Body</h3>
            {description && <div>{description}</div>}

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
                                <span className={`cell--${type}`}>{type}</span>
                            </small>
                        </div>
                        <div>
                            <small>
                                Required: {requestBody.required.toString()}
                            </small>
                        </div>
                    </div>
                    <ul>
                        {mappedProperties.map((item) => {
                            const isRequired =
                                required && required.indexOf(item.name) > -1;
                            return (
                                <li key={item.name}>
                                    <div>
                                        <small>
                                            {item.name}&nbsp;
                                            <span
                                                className={`cell--${item.type}`}>{`(${item.type})`}</span>
                                            {isRequired && (
                                                <span style={{ color: 'red' }}>
                                                    &nbsp;*
                                                </span>
                                            )}
                                        </small>
                                        {Object.prototype.hasOwnProperty.call(
                                            item,
                                            'properties'
                                        ) && (
                                            <ul>
                                                {item.properties.map(
                                                    (subItem) => (
                                                        <li key={subItem.name}>
                                                            <small>
                                                                {subItem.name}
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
                </div>
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
        if (
            Object.prototype.hasOwnProperty.call(properties[key], 'properties')
        ) {
            const tmp = propMapping(properties[key].properties);
            return { ...obj, properties: tmp };
        }
        return obj;
    });

    return result;
}
