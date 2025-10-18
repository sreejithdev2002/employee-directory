'use client';
import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // your backend
  }),
  cache: new InMemoryCache(),
});

export default function ClientWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
