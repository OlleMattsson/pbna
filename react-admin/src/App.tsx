// in App.js
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import {
  Admin,
  Resource,
  CustomRoutes,
  Menu,
  Layout,
  defaultDarkTheme,
  defaultLightTheme,
  combineDataProviders,
} from 'react-admin';
import authProvider from './authProvider';
import buildGraphQLProvider from './buildQuery';
import EntryList from './entry';
import account from './account';
import attachment from './attachment';
import accountChart from './accountChart';
import organization from './organization';
import accountingPeriod from './accountingPeriod';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Ledger, initData } from './ledger/Ledger';
import Login from './core/Login';
import Signup from './core/Signup';
import CreateProfile from './core/CreateProfile';
import { BalanceSheet } from './balance/Balance';
import { IncomeStatement } from './incomeStatement/IncomeStatement';
import { InvoiceDashboard } from './invoice/invoiceDashboard';
import { deepmerge } from '@mui/utils';

import PaidIcon from '@mui/icons-material/Paid';
import BalanceIcon from '@mui/icons-material/Balance';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssistantIcon from '@mui/icons-material/Assistant';

import { Journal } from './journal/Journal';
import { GlobalStyles, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';

// AG Grid base styles + Balham theme
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

// PBNA CORE MODULES
import { Ledger as LedgerModel } from './pbna-core/Ledger';
import { AccountManager } from './pbna-core/Account/AccountManager';
import { TransactionManager } from './pbna-core/Transaction/TransactionManager';

import keystoneRealtimeDataProvider from './dataProviders/keystoneRealtime';

import { attachmentDataProvider } from './dataProviders/graphql/attachments';
import { TransactionList } from './transaction/TransactionList';

export const App = () => {
  // init the pbna model
  const [ledger, setLedger] = useState();
  useEffect(() => {
    const accountManager = new AccountManager();
    const transactionManager = new TransactionManager();
    const ledgerModel = new LedgerModel({
      accountManager,
      transactionManager,
    });

    const init = async () => {
      setLedger(await initData(ledgerModel));
    };

    init();
  }, []);

  // init keystone dataprovider
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    buildGraphQLProvider.then((graphQlDataProvider) => setDataProvider(() => graphQlDataProvider));
  }, []);

  if (!dataProvider) {
    return <div>Loading </div>;
  }

  const combinedDataProviders = combineDataProviders((resource) => {
    switch (resource) {
      case 'Attachment':
        return attachmentDataProvider;
      default:
        return dataProvider;
    }
  });

  const crudAndRealtimedataProvider = {
    ...combinedDataProviders,

    // React-Admin / ra-realtime will call these:
    subscribe: keystoneRealtimeDataProvider.subscribe,
    unsubscribe: keystoneRealtimeDataProvider.unsubscribe,
    publish: keystoneRealtimeDataProvider.publish,
  };

  const lightTheme = defaultLightTheme;
  const darkTheme = deepmerge(defaultDarkTheme, { palette: { mode: 'dark' } });

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={crudAndRealtimedataProvider}
      layout={MyLayout}
      loginPage={Login}
      theme={lightTheme}
      darkTheme={darkTheme}
    >
      <Resource name="Entry" {...EntryList} />
      <Resource name="Attachment" {...attachment} />
      <Resource name="Account" {...account} />

      <Resource name="AccountChart" options={{ label: 'CoA' }} {...accountChart} />

      <Resource name="Organization" options={{ label: 'Organization' }} {...organization} />

      <Resource
        name="AccountingPeriod"
        options={{ label: 'Accounting Periods' }}
        {...accountingPeriod}
      />

      <CustomRoutes>
        <Route path="/ledger" element={<Ledger ledger={ledger} />} />
        <Route path="/balance" element={<BalanceSheet ledger={ledger} />} />
        <Route path="/income" element={<IncomeStatement ledger={ledger} />} />
        <Route path="/Journal" element={<Journal />} />
        <Route path="/invoice" element={<InvoiceDashboard />} />
        <Route path="/transaction" element={<TransactionList />} />

        {/*
         */}
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/CreateProfile" element={<CreateProfile />} />
      </CustomRoutes>
    </Admin>
  );
};

export const MyMenu = () => (
  <Paper elevation={1}>
    <Menu sx={{ backgroundColor: 'theme.palette.background.paper' }}>
      <Menu.DashboardItem />
      <Menu.ResourceItems />
      <Menu.Item to="/ledger" primaryText="Ledger" leftIcon={<AccountBalanceIcon />} />
      <Menu.Item to="/balance" primaryText="Balance Sheet" leftIcon={<BalanceIcon />} />
      <Menu.Item to="/income" primaryText="Income Statement" leftIcon={<PaidIcon />} />
      <Menu.Item to="/journal" primaryText="Journal BETA" leftIcon={<FormatListBulletedIcon />} />
      <Menu.Item to="/invoice" primaryText="Invoices" leftIcon={<AssistantIcon />} />
      <Menu.Item
        to="/transaction"
        primaryText="Transactions"
        leftIcon={<FormatListBulletedIcon />}
      />
    </Menu>
  </Paper>
);

export const MyLayout = (props) => (
  <>
    <GlobalStyles
      styles={(theme) => ({
        '.ag-theme-balham, .ag-theme-balham-dark, .ag-theme-alpine, .ag-theme-alpine-dark': {
          '--ag-background-color': theme.palette.background.paper,
          '--ag-foreground-color': theme.palette.text.primary,
          '--ag-secondary-foreground-color': theme.palette.text.secondary,
          '--ag-border-color': theme.palette.divider,
          '--ag-header-background-color': theme.palette.background.default,
          '--ag-header-foreground-color': theme.palette.text.primary,
          '--ag-odd-row-background-color': alpha(theme.palette.action.hover, 0.4),
          '--ag-row-hover-color': theme.palette.action.hover,
          '--ag-selected-row-background-color': alpha(theme.palette.primary.main, 0.12),
          '--ag-font-size': String(theme.typography.body2.fontSize || 14),
          '--ag-font-family': theme.typography.fontFamily,
        },
      })}
    />
    <Layout {...props} menu={MyMenu} />
  </>
);
