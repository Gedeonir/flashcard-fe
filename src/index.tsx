import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'


const backendLink = createHttpLink({
  uri:"https://flashcard-be-api.herokuapp.com/"
})

const client = new ApolloClient({
  link:backendLink,
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

