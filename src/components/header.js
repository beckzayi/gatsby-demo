import React from 'react';
import formatPage from '../util/formatPage';

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
            <div>
                {pages.map((arr, index) => (
                    <ul key={index}>
                    { arr.map(({slug, operationId}) => (
                            <li key={operationId}><a href={`/pages/${slug}`}>{operationId}</a></li>
                    )) }
                    </ul>
                ))}
            </div>
        </header>
    );
};
