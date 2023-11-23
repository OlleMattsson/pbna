// in App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import {EntryList} from "./entry/EntryList"
import {AttachmentList} from "./attachment/AttachmentList"
import buildGraphQLProvider from './buildQuery';

export const App = () => {

    const [dataProvider, setDataProvider] = React.useState(null);
    React.useEffect(() => {
        buildGraphQLProvider.then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    if (!dataProvider) {
        return <div>Loading </ div>;
    }

    return (
        <Admin dataProvider= { dataProvider } >
            <Resource name="Entry" list = { EntryList }/>
            <Resource name="Attachment" list = { AttachmentList }/>
        </Admin>
    );
}
