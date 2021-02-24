import React, { useState } from 'react';
import Response from './response';

export default ({ responses, url, method }) => {
    const arrayStatusCode = Object.keys(responses);
    const [status, setStatus] = useState(arrayStatusCode[0]);

    const handleClick = (e) => {
        setStatus(e.target.textContent);
    };

    return (
        <div>
            <h2>Responses</h2>
            {arrayStatusCode.length > 0 && (
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '8%' }}>
                        {Object.keys(responses).map((key) => (
                            <div key={key} style={{ marginBottom: '0.4rem' }}>
                                <button
                                    className={key.indexOf('2') === 0 ? 'text-success' : 'text-danger'}
                                    style={key !== status ? { opacity: '0.4' } : { fontWeight: 'bold' }}
                                    onClick={handleClick}>
                                    {key}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ width: '92%' }}>
                        {Object.keys(responses).map((key) => (
                            <div key={key} style={key !== status ? { display: 'none' } : {}}>
                                <Response
                                    key={key}
                                    response={responses[key]}
                                    statusCode={key}
                                    url={url}
                                    method={method}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
