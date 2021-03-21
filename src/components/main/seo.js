import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import useSiteMetadata from '../../hooks/use-site-metadata';

const SEO = (props) => {
    const { href, origin } = useLocation();
    const metaData = useSiteMetadata();
    const title = [
        props.pageContext.identifier || (props.pageContext.frontmatter && props.pageContext.frontmatter.title) || '',
        props.title || metaData.defaultTitle,
    ]
        .filter((item) => !item === false) // Remove null, undefined, and empty string
        .join(' - ');
    const seo = {
        title,
        description: props.description || metaData.defaultDescription,
        url: href,
        image: `${origin}${props.image || metaData.defaultImage}`,
    };
    return (
        <Helmet title={seo.title} htmlAttributes={{ lang: 'en' }}>
            {seo.description && <meta name="description" content={seo.description} />}
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
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

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
};

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
};
