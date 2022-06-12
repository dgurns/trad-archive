import { useQuery } from "@apollo/client";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

import type { Collection } from "~/types";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import { COLLECTION_QUERY } from "~/routes/entities/collections/[slug]";
import Breadcrumb from "~/components/Breadcrumb";

const CollectionAbout = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery<{
		collection: Collection;
	}>(COLLECTION_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, description, aliases, itmaAtomSlug } = data?.collection ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Collections", href: "/entities/collections" },
							{ label: name, href: `/entities/collections/${slug}` },
							{ label: "About" },
						]}
						className="mb-6"
					/>

					{itmaAtomSlug && (
						<div className="mb-4">
							<div className="italic text-gray-500">
								This was sourced from ITMA's AtoM archive
							</div>
							<a
								href={`https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`}
								target="_blank"
								rel="noreferrer"
							>
								View on AtoM <i className="material-icons text-sm">launch</i>
							</a>
						</div>
					)}
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
					<Link to={`/entities/collections/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default CollectionAbout;
