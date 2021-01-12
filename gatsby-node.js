exports.createPages = ({ actions: { createPage } }) => {
    const pageData = require('./data/pages.json');

    const { paths } = pageData;

    // convert JSON string to array
    const pages = Object.keys(paths).map(key => {
        const page = paths[key];
        page.slug = key;
        return page;
    });

    pages.forEach(page => {
        createPage({
            path: `/pages${page.slug}`,
            component: require.resolve(`./src/templates/page-template.js`),
            context: { page }
        })
    });
}
