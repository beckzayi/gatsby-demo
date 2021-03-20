import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import useSiteMetadata from '../../hooks/use-site-metadata';

const SEO = (props) => {
    const { href, origin } = useLocation();
    const metaData = useSiteMetadata();
    const title = [
        props.pageContext.identifier || props.pageContext.frontmatter.title || '',
        props.title || metaData.defaultTitle,
    ].join(' - ');
    const seo = {
        title,
        description: props.description || metaData.defaultDescription,
        url: href,
        image: `${origin}${props.image || metaData.defaultImage}`,
    };
    return (
        <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && <meta property="og:description" content={seo.description} />}
            {seo.image && <meta property="og:image" content={seo.image} />}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && <meta name="twitter:description" content={seo.description} />}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
        </Helmet>
    );
};

export default SEO;
