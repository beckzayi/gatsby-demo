import React from 'react';

export default () => {
    // const pageData = require('../../data/pages.json');
    // const { paths } = pageData;

    // const pages = Object.keys(paths).map(key => {
    //     const page = paths[key];
    //     page.slug = key;
    //     return page;
    // });

    const data = require('../../data/api.json');
    const { paths } = data;
    console.log('paths', paths);

    const pages = Object.keys(paths).map(path => {
        let page = {};
        if (paths[path].get) {
            page.get = paths[path].get;
        }
        if (paths[path].post) {
            page.post = paths[path].post;
        }
        return page;
    })

    return (
        <header>
            <ul>
                {/* {pages.map(({slug, operationId}) => (
                    <li key={slug}><a href={`/pages${slug}`}>{operationId}</a></li>
                ))} */}
                pages
            </ul>
        </header>
    );
};
