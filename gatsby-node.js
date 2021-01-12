exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    const pageData = [
        {
            slug: '/ping',
            operationId: 'Ping',
            descirption: 'Checks the health of the client facing API server, including connectivity to any underlying API servers, databases or file servers.',
            summary: 'Pings the server'
        },
        {
            slug: '/users/self',
            descirption: 'This endpoint provides details of the current user (currently only username).\n\n**NOTE:** This API is subject to change, specifically it will change from a String to an object representing the full details of the user in a future release.\n',
            operationId: 'RetrieveCurrentUser',
            summary: 'Retrieves the current user'
        },
        {
            slug: '/accounts/self',
            descirption: 'Returns information about the user authenticated with by the current JWT.\n\n**Note:** This API is subject to change, in future releases it will return a JSON object with richer account details.\n',
            operationId: 'RetrieveCurrentAccount',
            summary: 'Retrieves the current account'
        }
    ];

    pageData.forEach(page => {
        createPage({
            path: `/pages${page.slug}`,
            component: require.resolve(`./src/templates/page-template.js`),
            context: { page }
        })
    });
}
