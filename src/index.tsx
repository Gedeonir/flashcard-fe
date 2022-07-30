import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'
import {setContext} from '@apollo/client/link/context';
import { AUTH_TOKEN } from './graphql_api/constants';

const backendLink = createHttpLink({
  uri:"https://flashcard-be-api.herokuapp.com/"
})

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem(AUTH_TOKEN);

  return{
    headers:{
      ...headers,
      authorization:token ? `${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link:authLink.concat(backendLink),
  cache:new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

