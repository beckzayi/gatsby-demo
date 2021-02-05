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
                        <th>Required</th>
                        <th>Type</th>
                        <th>Example</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map((p) => (
                        <Parameter key={p.name} parameter={p} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
