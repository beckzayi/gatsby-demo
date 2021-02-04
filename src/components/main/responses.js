import React from 'react';
import Response from './response';

export default ({ responses }) => {
    return (
        <div>
            <h2>Responses</h2>
            <div>
                {Object.keys(responses).map((key) => (
                    <Response
                        key={key}
                        response={responses[key]}
                        statusCode={key}
                    />
                ))}
            </div>
        </div>
    );
};
