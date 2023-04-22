import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import styles from "~/styles/globals-generated-do-not-edit.css";

import { getSession } from "~/sessions.server";
import { db } from "~/utils/db.server";

import PlayerContextProvider from "~/components/PlayerContextProvider";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { User } from "@prisma/client";

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

export function headers() {
	// check if there is a new version of the page; if not, use the cached version
	return {
		"Cache-Control": "private, max-age=0, must-revalidate",
	};
}

interface LoaderData {
	currentUser: User | null;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	let currentUser: User | null = null;
	if (userId) {
		currentUser = await db.user.findUnique({ where: { id: userId } });
	}

	const data = { currentUser };
	return json<LoaderData>(data);
};

export default function App() {
	const { currentUser } = useLoaderData<LoaderData>();

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
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
							<Header currentUser={currentUser} />
						</div>
					</div>

					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</PlayerContextProvider>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<PlayerContextProvider>
				<body className="bg-gray-100">
					<div className="flex flex-col w-full relative pt-12">
						<div className="flex flex-col justify-start items-center">
							<div className="w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center">
								<h1>Oops! There was an error.</h1>
								<p className="text-red-500 mt-2">{(error as Error).message}</p>
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
		</html>
	);
}
