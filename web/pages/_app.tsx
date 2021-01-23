import 'styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PlayerContext } from 'hooks/usePlayer';
import { Item } from 'types';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

function MyApp({ Component, pageProps }) {
  const [activePlayerItem, setActivePlayerItem] = useState<Item>(null);

  return (
    <ApolloProvider client={apolloClient}>
      <PlayerContext.Provider value={{ setActivePlayerItem, activePlayerItem }}>
        <Head>
          <title>Trad Archive</title>
        </Head>
        <Component {...pageProps} />
      </PlayerContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
