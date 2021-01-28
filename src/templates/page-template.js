import React from 'react';
import Header from '../components/header';

export default ( { pageContext: { page } } ) => {
    return (
        <div>
            <Header />
            <hr />
            <section>
                <h2>{page.operationId}</h2>
                <div>Summary: {page.summary}</div>
                <div>Description: {page.description}</div>
            </section>
        </div>
    );
}