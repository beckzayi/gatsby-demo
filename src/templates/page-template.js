import React from 'react';
import Header from '../components/header';

export default ( { pageContext: { page } } ) => {
    const { operationId, summary, description } = page;
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                <Header />
            </div>
            <div style={{
                width: '80%',
                padding: '0 5%'
            }}>
                <section style={{ fontFamily: 'system-ui'}}>
                    <h1 style={{ marginBottom: '2.8rem', color: '#663399' }}>{operationId}</h1>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Summary:</h3>
                        <p>{summary}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Description:</h3>
                        <p>{description}</p>
                    </div>
                </section>
            </div>
        </div>
    );
}