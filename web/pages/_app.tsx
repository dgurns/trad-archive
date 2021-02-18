import 'styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PlayerContext } from 'hooks/usePlayer';
import { AudioItem } from 'types';
import Player from 'components/Player';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          tags: {
            merge: false,
          },
        },
      },
      Instrument: {
        fields: {
          tags: {
            merge: false,
          },
        },
      },
      AudioItem: {
        fields: {
          tags: {
            merge: false,
          },
        },
      },
    },
  }),
  credentials: 'include',
});

function App({ Component, pageProps }) {
  const [activePlayerAudioItem, setActivePlayerAudioItem] = useState<AudioItem>(
    null
  );

  return (
    <ApolloProvider client={apolloClient}>
      <PlayerContext.Provider
        value={{ setActivePlayerAudioItem, activePlayerAudioItem }}
      >
        <Head>
          <title>Trad Archive</title>
        </Head>

        <Component {...pageProps} />

        {/* Player is rendered here so it is persistent across all routes */}
        {activePlayerAudioItem && (
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
