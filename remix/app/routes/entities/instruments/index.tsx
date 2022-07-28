import { Link, useLoaderData } from "@remix-run/react";
import { type ActionFunction, json, redirect } from "@remix-run/node";
import { type Instrument } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";

export function meta() {
	return {
		title: "Trad Archive - Instruments",
	};
}

export function loader(): Promise<Instrument[]> {
	return db.instrument.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

interface ActionData {
	error?: string;
	instrument?: Instrument;
}

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	const referer = String(request.headers.get("referer") ?? "");

	const redirectTo = encodeURIComponent(
		referer ? new URL(referer).pathname : "/"
	);
	if (!userId) {
		return redirect(`/login?redirectTo=${redirectTo}`);
	}

	const formData = await request.formData();
	const name = String(formData.get("name") ?? "");
	const slug = String(formData.get("slug") ?? "");
	const description = String(formData.get("description") ?? "");
	const aliases = String(formData.get("aliases") ?? "");

	const cleanedSlug = EntityService.cleanSlug(slug);

	let error;
	if (!name || !slug) {
		error = "Must enter a name and slug";
	}
	if (error) {
		return json<ActionData>({ error }, { status: 400 });
	}

	const existing = await db.instrument.findFirst({
		where: { slug: cleanedSlug },
	});
	if (existing) {
		return json<ActionData>(
			{
				error: `This slug is already being used for an existing Instrument: ${existing.name}`,
			},
			{ status: 400 }
		);
	}

	try {
		const instrument = await db.instrument.create({
			data: {
				name,
				slug: cleanedSlug,
				description,
				aliases,
				createdByUserId: userId,
				updatedByUserId: userId,
			},
		});
		return json<ActionData>({ instrument }, { status: 201 });
	} catch {
		return json<ActionData>(
			{ error: "Error creating Instrument" },
			{ status: 500 }
		);
	}
};

const Instruments = () => {
	const instruments = useLoaderData<Instrument[]>();

	return (
		<Layout>
			<h1 className="mb-6">Instruments</h1>
			{instruments.length === 0 && (
				<div className="text-gray-500">No Instruments found</div>
			)}
			{instruments.length > 0 && (
				<ul>
					{instruments.map((instrument, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(instrument)}>
								{instrument.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Instruments;
