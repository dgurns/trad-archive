import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { ApolloProvider } from "@apollo/client";
import styles from "~/styles/globals-generated-do-not-edit.css";

import { apolloClient } from "~/apolloClient";
import PlayerContextProvider from "~/components/PlayerContextProvider";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Trad Archive",
	viewport: "width=device-width,initial-scale=1",
});

export function links() {
	return [
		{ rel: "stylesheet", href: styles },
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			href: "/favicons/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "192x192",
			href: "/favicons/android-chrome-192x192.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			href: "/favicons/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			href: "/favicons/favicon-16x16.png",
		},
		{
			rel: "shortcut icon",
			href: "/favicons/favicon.ico",
		},
	];
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<ApolloProvider client={apolloClient}>
				<PlayerContextProvider>
					<body className="bg-gray-100">
						<div className="flex flex-col w-full relative pt-12">
							<div className="flex flex-col justify-start items-center">
								<div className="w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44">
									<Outlet />
								</div>
								<Footer />
							</div>

							{/* Add header to the DOM after child content so its modals overlay */}
							<div className="fixed top-0 right-0 left-0" id="header">
								<Header />
							</div>
						</div>

						<ScrollRestoration />
						<Scripts />
						<LiveReload />
					</body>
				</PlayerContextProvider>
			</ApolloProvider>
		</html>
	);
}
