// in App.js
import React from 'react';
import { Route } from "react-router-dom";
import { Admin, Resource, CustomRoutes, Menu, Layout } from 'react-admin';
import authProvider from './authProvider'
import buildGraphQLProvider from './buildQuery';
import EntryList from "./entry"
import account from "./account"
import attachment from "./attachment"
import accountChart from "./accountChart"
import organization from "./organization"
import OrganizationEdit from './organization/OrganizationEdit';
import accountingPeriod from "./accountingPeriod"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {Ledger} from "./ledger/Ledger"
import BusinessIcon from '@mui/icons-material/Business';



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
            layout={MyLayout}

        >
            <Resource name="Entry" {...EntryList}/>
            <Resource name="Attachment" {...attachment}/>
            <Resource name="Account" {...account}/>

            <Resource name="AccountChart"
                options={{ label: 'CoA' }} 
                {...accountChart}
            />

            <Resource name="Organization" 
                options={{ label: 'Organization' }} 
                {...organization}
            />

            <Resource name="AccountingPeriod"
                options={{ label: 'Accounting Periods' }}                 
                {...accountingPeriod}
            />
           
            <CustomRoutes>
                <Route path="/ledger" element={<Ledger />} />
            </CustomRoutes>

        </Admin>
    );
}

export const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItems />
        <Menu.Item to="/ledger" primaryText="Ledger" leftIcon={<AccountBalanceIcon />}/>
    </Menu>
);

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;
