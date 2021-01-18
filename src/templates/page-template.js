import React from 'react';
import Header from '../components/header';

export default ( { pageContext: { page } } ) => {
    return (
        <div>
            <Header />
        <section>
            <h2>{page.operationId}</h2>
            <div>Summary: {page.summary}</div>
            <div>Descirption: {page.descirption}</div>
        </section>
        </div>
    );
}