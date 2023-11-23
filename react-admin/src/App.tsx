// in App.js
import React from 'react';
import { Component } from 'react';
//import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, Resource } from 'react-admin';
import {EntryList} from "./entry/EntryList"
import {AttachmentList} from "./attachment/AttachmentList"
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


//import {myBuildQuery} from './buildQuery';
import buildGraphQLProvider from './buildQuery';

//console.log(myBuildQuery)


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql'
  })
});




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
