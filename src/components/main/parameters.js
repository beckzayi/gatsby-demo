import React from 'react';
import Parameter from './parameter';

export default ({ parameters }) => {
    return (
        <div>
            <h2>Parameters</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Allow Empty Value</th>
                        <th>Example</th>
                        <th>in</th>
                        <th>Required</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map(p => (
                        <Parameter key={p.name} parameter={p} />
                    ))}
                </tbody>
            </table>
        </div>
    )
};
