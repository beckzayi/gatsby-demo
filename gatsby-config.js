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
                name: 'pages',
                path: `${__dirname}/src/mds/`,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
            },
        },
    ],
};
