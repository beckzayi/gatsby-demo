import { graphql, useStaticQuery } from 'gatsby';

export default () => {
    const data = useStaticQuery(graphql`
        query SiteMetadata {
            site {
                siteMetadata {
                    defaultTitle: title
                    defaultDescription: description
                    siteUrl: url
                    defaultImage: image
                }
            }
        }
    `);
    return data.site.siteMetadata;
};
