const formatPage = require('./src/util/listPages');

exports.createPages = ({ actions: { createPage } }) => {
    const pageData = require('./data/api.json');

    const { paths } = pageData;

    const results = [];

    // convert JSON string to array
    Object.keys(paths).forEach(key => {
        // `key` here is the api request url
        const apiUrl = key;
        const arrayOfPages = formatPage(paths[apiUrl], apiUrl);
        arrayOfPages.forEach((item) => {
            results.push(item);
        });
    });

    results.forEach(page => {
        createPage({
            path: `/docs/${page.slug}`,
            component: require.resolve(`./src/templates/page-template.js`),
            context: { page, identifier: page.operationId }
        })
    });
}
