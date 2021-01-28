import React from 'react';
import formatPage from '../util/formatPage';
import Nav from './nav';

export default () => {
    const data = require('../../data/api.json');
    const { paths } = data;

    const pages = Object.keys(paths).map(key => {
        // `key` here is the api request url
        const apiUrl = key;
        const page = formatPage(paths[apiUrl]);
        return page;
    });

    return (
        <header>
            <div style={{ fontFamily: 'monospace' }}>
                <Nav pages={pages} />
            </div>
        </header>
    );
};
