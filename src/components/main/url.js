import React from 'react';

export default ({ method, url }) => (
    <h3>
        <span style={{ textTransform: 'uppercase' }}>{method}</span> {url}
    </h3>
);
