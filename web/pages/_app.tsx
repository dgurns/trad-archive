import 'styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PlayerContext } from 'hooks/usePlayer';
import { Item } from 'types';
import Player from 'components/Player';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

function App({ Component, pageProps }) {
  const [activePlayerItem, setActivePlayerItem] = useState<Item>(null);

  return (
    <ApolloProvider client={apolloClient}>
      <PlayerContext.Provider value={{ setActivePlayerItem, activePlayerItem }}>
        <Head>
          <title>Trad Archive</title>
        </Head>

        <Component {...pageProps} />

        {/* The Player needs to be rendered here so it is global */}
        {activePlayerItem && (
          <div
            className="fixed bottom-0 left-0 right-0"
            style={{
              boxShadow:
                '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Player />
          </div>
        )}
      </PlayerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
