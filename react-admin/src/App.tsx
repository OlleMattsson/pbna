// in App.js
import React from 'react';
import { Route } from "react-router-dom";
import { Admin, Resource, CustomRoutes } from 'react-admin';
import authProvider from './authProvider'
import buildGraphQLProvider from './buildQuery';
import EntryList from "./entry"
import account from "./account"
import attachment from "./attachment"
import accountChart from "./accountChart"
import CustomPage from './CustomPage';



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
            <Resource name="Entry" {...EntryList}/>
            <Resource name="Attachment" {...attachment}/>
            <Resource name="Account" {...account}/>
            <Resource name="AccountChart" {...accountChart}/>
           
            <CustomRoutes>
                <Route path="/custom" element={<CustomPage />} />
            </CustomRoutes>

        </Admin>
    );
}
