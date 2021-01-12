import React from 'react';

export default ( { pageContext: { page } } ) => {
    return (
        <section>
            <h2>{page.operationId}</h2>
            <div>Summary: {page.summary}</div>
            <div>Descirption: {page.descirption}</div>
        </section>
    );
}