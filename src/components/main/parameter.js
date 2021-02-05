import React from 'react';

export default ({ parameter }) => {
    const {
        allowEmptyValue,
        description,
        example,
        name,
        required,
        schema: { type },
    } = parameter;
    if ((allowEmptyValue !== null) & (allowEmptyValue !== undefined)) {
        return (
            <tr>
                <td>{name}</td>
                <td>{required ? 'required' : 'optional'}</td>
                <td>{type}</td>
                <td>{example}</td>
                <td>{description}</td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>TODO:</td>
                <td>dynamically display items</td>
                <td>TODO</td>
                <td>TODO</td>
                <td>TODO</td>
                <td>TODO</td>
                <td>TODO</td>
            </tr>
        );
    }
};
