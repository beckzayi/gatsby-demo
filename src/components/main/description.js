import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ content }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h3>Description:</h3>
        <p>
            <ReactMarkdown>{content}</ReactMarkdown>
        </p>
    </div>
);
