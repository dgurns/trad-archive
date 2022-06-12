import { useQuery } from "@apollo/client";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

import type { Person } from "~/types";

import Layout from "~/components/Layout";
import { PERSON_QUERY } from "~/routes/entities/people/[slug]";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";

const PersonAbout = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery<{
		person: Person;
	}>(PERSON_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, description, aliases } = data?.person ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "People", href: "/entities/people" },
							{ label: name, href: `/entities/people/${slug}` },
							{ label: "About" },
						]}
						className="mb-6"
					/>
					{description && (
						<div className="mb-4">
							Description:
							<br />
							<span className="text-gray-500 whitespace-pre-wrap">
								{description}
							</span>
						</div>
					)}
					{aliases && (
						<div className="mb-4">
							Aliases:
							<br />
							<span className="text-gray-500">{aliases}</span>
						</div>
					)}
					<Link to={`/entities/people/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default PersonAbout;
