import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import OperationId from '../components/main/operationId';
import Url from '../components/main/url';
import Summary from '../components/main/summary';
import Description from '../components/main/description';
import Responses from '../components/main/responses';
import Parameters from '../components/main/parameters';
import RequestBody from '../components/main/requestBody';
import '../styles/app.css';

export default ({ pageContext: { page }, data }) => {
    const { operationId, summary, description, method, url, responses, parameters, requestBody } = page;

    const {
        allMdx: { edges, totalCount },
    } = data;

    return (
        <div>
            <section style={{ fontFamily: 'system-ui' }}>
                <OperationId content={operationId} />
                {totalCount > 0 && <MDXRenderer>{edges[0].node.body}</MDXRenderer>}
                <Url method={method} url={url} />
                <Summary content={summary} />
                <Description content={description} />
                {parameters && parameters.length > 0 && <Parameters parameters={parameters} />}
                {requestBody && <RequestBody requestBody={requestBody} />}
                <Responses responses={responses} url={url} method={method} />
            </section>
        </div>
    );
};

export const mdxQuery = graphql`
    query($identifier: String!) {
        allMdx(filter: { frontmatter: { operationId: { eq: $identifier } } }) {
            totalCount
            edges {
                node {
                    frontmatter {
                        operationId
                        title
                    }
                    body
                }
            }
        }
    }
`;
