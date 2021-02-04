import React from 'react';
import { Link } from 'gatsby';
import { PATH_PREFIX_DOCS } from '../util/helper';

export default ({ pages }) =>
    pages.map((arr, index) => (
        <ul
            key={index}
            style={{
                listStyle: 'none',
                borderBottom: '1px solid lightgrey',
            }}>
            {arr.map(({ slug, operationId }) => (
                <li key={operationId}>
                    <Link
                        to={`/${PATH_PREFIX_DOCS}/${slug}`}
                        style={{
                            textDecoration: 'none',
                            color: '#635E69',
                        }}
                        activeStyle={{
                            color: '#663399',
                            fontWeight: 'bold',
                        }}>
                        {operationId}
                    </Link>
                </li>
            ))}
        </ul>
    ));
