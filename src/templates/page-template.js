import React from 'react';
import Header from '../components/header';
import OperationId from '../components/main/operationId';
import Url from '../components/main/url';
import Summary from '../components/main/summary';
import Description from '../components/main/description';
import Responses from '../components/main/responses';

export default ( { pageContext: { page } } ) => {
    const { operationId, summary, description, method, url, responses } = page;
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
                    <OperationId content={operationId} />
                    <Url method={method} url={url} />
                    <Summary content={summary} />
                    <Description content={description} />
                    <Responses responses={responses} />
                </section>
            </div>
        </div>
    );
}