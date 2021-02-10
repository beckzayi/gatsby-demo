import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ parameter }) => {
    const {
        description,
        example,
        name,
        required,
        schema: { type },
    } = parameter;

    return (
        <tr>
            <td className="cell--first">{name}</td>
            <td className={`cell--${type}`}>{type}</td>
            <td className="cell--description">
                <ReactMarkdown>{description}</ReactMarkdown>
            </td>
            <td className={required ? 'cell--required' : 'cell--optional'}>
                {required ? 'required' : 'optional'}
            </td>
            <td className="cell--example">{example}</td>
        </tr>
    );
};
