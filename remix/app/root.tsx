import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "@remix-run/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import styles from "~/styles/globals-generated-do-not-edit.css";

import PlayerContextProvider from "~/components/PlayerContextProvider";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

// TODO: Remove this
const apolloClient = new ApolloClient({ cache: new InMemoryCache() });

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Trad Archive",
	viewport: "width=device-width,initial-scale=1",
});

export function links() {
	return [
		{ rel: "stylesheet", href: styles },
		{ rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
		{ rel: "preconnect", href: "https://fonts.gstatic.com/" },
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/icon?family=Material+Icons",
		},
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

interface ErrorBoundaryArgs {
	error: Error;
}
export function ErrorBoundary({ error }: ErrorBoundaryArgs) {
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
								<div className="w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center">
									<h1>Oops! There was an error.</h1>
									<p className="text-red-500 mt-2">{error.message}</p>
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

export function CatchBoundary() {
	const caught = useCatch();
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
								<div className="w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center">
									<h1>Oops! There was an error.</h1>
									<p className="text-red-500 mt-2">
										{caught.status} - {caught.statusText}
									</p>
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
