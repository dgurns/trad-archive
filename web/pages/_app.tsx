import 'styles/globals.css';
import { Head } from 'next/document';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import useCurrentUser from 'hooks/useCurrentUser';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
});

function MyApp({ Component, pageProps }) {
  const [currentUser] = useCurrentUser();

  // TODO: If no currentUser, return app. If loading, wait.

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Trad Archive</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
