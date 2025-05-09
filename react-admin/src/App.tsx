// in App.js
import { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import { Admin, Resource, CustomRoutes, Menu, Layout, useLogin, useNotify } from 'react-admin';
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
import {Ledger, initData} from "./ledger/Ledger"
import BusinessIcon from '@mui/icons-material/Business';
import Button from '@mui/material/Button'
import Login from './core/Login'
import Signup from './core/Signup'
import CreateProfile from './core/CreateProfile'
import { BalanceSheet } from './balance/Balance';
import { IncomeStatement} from './incomeStatement/IncomeStatement'
import PaidIcon from '@mui/icons-material/Paid';
import BalanceIcon from '@mui/icons-material/Balance';

// PBNA CORE MODULES
import { Ledger as LedgerModel } from "./pbna-core/Ledger"
import { AccountManager } from './pbna-core/Account/AccountManager'
import { TransactionManager } from './pbna-core/Transaction/TransactionManager'

export const App = () => {

    // init the pbna model
    const [ledger, setLedger] = useState()
    useEffect(() => {
        const accountManager = new AccountManager();
        const transactionManager = new TransactionManager();
        const ledgerModel = new LedgerModel({
            accountManager,
            transactionManager
        })
    
        const init = async () => {
            setLedger(await initData(ledgerModel))
        }
    
        init()
    }, [])

    // init keystone dataprovider
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
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
            loginPage={Login}
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
                <Route path="/ledger" element={<Ledger ledger={ledger}/>} />
                <Route path="/balance" element={<BalanceSheet ledger={ledger}/>} />
                <Route path="/income" element={<IncomeStatement ledger={ledger}/>} />
                {/*
            */}
            </CustomRoutes>

            <CustomRoutes noLayout>
                <Route path="/Signup" element={<Signup />}  />
                <Route path="/CreateProfile" element={<CreateProfile />}  />
            </CustomRoutes>



        </Admin>
    );
}

export const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItems />
        <Menu.Item to="/ledger" primaryText="Ledger" leftIcon={<AccountBalanceIcon />}/>
        <Menu.Item to="/balance" primaryText="Balance Sheet" leftIcon={<BalanceIcon />}/>
        <Menu.Item to="/income" primaryText="Income Statement" leftIcon={<PaidIcon />}/>
    </Menu>
);

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;
