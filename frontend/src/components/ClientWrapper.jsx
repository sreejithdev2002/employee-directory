"use client";
import React from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API,
  }),
  cache: new InMemoryCache(),
});

export default function ClientWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
