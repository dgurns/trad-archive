import "styles/globals.css";
import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "apolloClient";

import PlayerContextProvider from "components/PlayerContextProvider";

function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={apolloClient}>
			<PlayerContextProvider>
				<Head>
					<title>Trad Archive</title>
				</Head>

				<Component {...pageProps} />
			</PlayerContextProvider>
		</ApolloProvider>
	);
}

export default App;
