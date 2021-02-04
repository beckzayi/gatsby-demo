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
    if (allowEmptyValue) {
        return (
            <tr>
                <td>{name}</td>
                <td>{description}</td>
                <td>{allowEmptyValue.toString()}</td>
                <td>{example}</td>
                <td>{parameter.in}</td>
                <td>{required.toString()}</td>
                <td>{type}</td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>TODO:</td>
                <td>dynamically display items</td>
            </tr>
        );
    }
};
