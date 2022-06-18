import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";
import type { Person } from "@prisma/client";

import { db } from "~/utils/db.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

export async function loader({
	params,
}: DataFunctionArgs): Promise<Person | null> {
	const { slug } = params;
	return db.person.findUnique({
		where: {
			slug,
		},
	});
}

const ViewPersonBySlug = () => {
	const person = useLoaderData<Person | null>();

	if (!person) {
		return <Layout>Can't find this Person.</Layout>;
	}

	return (
		<Layout>
			<ViewEntityAndAudioItems entity={person} />
		</Layout>
	);
};

export default ViewPersonBySlug;
