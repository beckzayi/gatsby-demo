module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages/`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'mds',
                path: `${__dirname}/src/mds/`,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
            },
        },
        'gatsby-plugin-theme-ui',
    ],
    siteMetadata: {
        title: 'enableHR API',
        description: 'Hosted API documentation for EnableHR endpoints',
        url: 'https://www.enablehr.com.au',
        image: '/images/logo.svg',
    },
};
