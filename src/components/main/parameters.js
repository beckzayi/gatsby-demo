import React from 'react';
import Parameter from './parameter';

export default ({ parameters }) => {
    // Parameter can be in "path" or "query". Separate them in a group
    const parameters_in_query = parameters.filter((p) => p.in === 'query');
    const parameters_in_path = parameters.filter((p) => p.in === 'path');

    return (
        <>
            {parameters_in_path.length > 0 && (
                <div>
                    <h3>Path Parameters</h3>
                    <table>
                        <tbody>
                            {parameters_in_path.map((p) => (
                                <Parameter key={p.name} parameter={p} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {parameters_in_query.length > 0 && (
                <div>
                    <h3>Query String</h3>
                    <table>
                        <tbody>
                            {parameters_in_query.map((p) => (
                                <Parameter key={p.name} parameter={p} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
