// in App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './authProvider'
import buildGraphQLProvider from './buildQuery';
import {EntryList} from "./entry/EntryList"
import {AttachmentList} from "./attachment/AttachmentList"
import account from "./account"
import accountChart from "./accountChart"


export const App = () => {

    const [dataProvider, setDataProvider] = React.useState(null);

    React.useEffect(() => {
        buildGraphQLProvider.then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    if (!dataProvider) {
        return <div>Loading </ div>;
    }

    return (
        <Admin 
            authProvider={authProvider} 
            dataProvider={dataProvider} 
        >
            <Resource name="Entry" list = {EntryList}/>
            <Resource name="Attachment" list = {AttachmentList}/>
            <Resource name="Account" {...account}/>
            <Resource name="AccountChart" {...accountChart}/>
        </Admin>
    );
}
