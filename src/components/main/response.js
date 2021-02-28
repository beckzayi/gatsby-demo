import React, { useState } from 'react';
import { getComponentObject } from '../../util/helper';
import getExampleValue, { getSchemaProperties, propMapping } from '../../util/getExampleValue';
import getCodeSnippets from '../../util/getCodeSnippets';

export default ({ response, statusCode, url, method }) => {
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
    if (schema2 && Object.prototype.hasOwnProperty.call(schema2, 'properties')) {
        const { properties } = schema2;
        mappedProperties = propMapping(properties);
    }

    const [displaySchema, setDisplaySchema] = useState(true);
    const handleOnClickSchema = (v) => {
        setDisplaySchema(v);
    };

    const { snippets } = getCodeSnippets(url, method);

    const [language, setLanguage] = useState('java');
    const handleOnClickLanguage = (lang) => {
        setLanguage(lang);
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
                        onClick={() => handleOnClickSchema(true)}>
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
                        onClick={() => handleOnClickSchema(false)}>
                        Example
                    </span>
                </div>
                {schema2 && Object.prototype.hasOwnProperty.call(schema2, 'properties') && (
                    <div
                        style={{
                            marginTop: '0.5rem',
                            marginBottom: '1rem',
                            display: displaySchema ? 'block' : 'none',
                        }}>
                        <div>
                            <div>
                                <small>
                                    Type: <span className={`cell--${schema2.type}`}>{schema2.type}</span>
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
                                                    <span className={`cell--${item.type}`}>{`(${item.type})`}</span>
                                                </small>
                                                {Object.prototype.hasOwnProperty.call(item, 'properties') && (
                                                    <ul>
                                                        {item.properties.map((subItem) => (
                                                            <li key={subItem.name}>
                                                                <small>
                                                                    {subItem.name}
                                                                    &nbsp;
                                                                    <span
                                                                        className={`cell--${subItem.type}`}>{`(${subItem.type})`}</span>
                                                                </small>
                                                            </li>
                                                        ))}
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

            {snippets && (
                <div className="snippets">
                    <h3>Code Generation</h3>
                    <ul>
                        {snippets.map(({ id, title }) => (
                            <span
                                key={id}
                                style={{
                                    marginRight: '1rem',
                                    fontSize: '0.875rem',
                                    color: language === id ? '#f39c12' : '#999',
                                    fontWeight: language === id ? 'bold' : 'normal',
                                    opacity: language === id ? '1' : '0.6',
                                    cursor: language === id ? 'default' : 'pointer',
                                    borderBottom: language === id ? '1px solid #f39c12' : 'none',
                                }}
                                onClick={() => handleOnClickLanguage(id)}>
                                {getLanguageTitle(title)}
                            </span>
                        ))}
                    </ul>
                    <ul>
                        {snippets.map((snippet) => {
                            const { id, content } = snippet;
                            return (
                                <li key={id} style={{ display: language === id ? 'block' : 'none' }}>
                                    <div style={{ overflow: 'auto auto', minHeight: '200px', height: '200px' }}>
                                        <pre>{decodeURIComponent(content)}</pre>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

function getLanguageTitle(title) {
    if (title.indexOf(' ') > -1) {
        const arr = title.split(' ');
        return arr[0];
    }
    return title;
}
