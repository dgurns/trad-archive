import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { Place } from "types";

import Layout from "components/Layout";
import { PLACE_QUERY } from "pages/entities/places/[slug]";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const PlaceAbout = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, error } = useQuery<{
		place: Place;
	}>(PLACE_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, description, aliases, latitude, longitude } = data?.place ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Places", href: "/entities/places" },
							{ label: name, href: `/entities/places/${slug}` },
							{ label: "About" },
						]}
						className="mb-6"
					/>
					{description && (
						<div className="mb-4">
							Description:
							<br />
							<span className="text-gray-500 whitespace-pre">
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
					{latitude && longitude && (
						<div className="mb-4">
							Latitude and Longitude:
							<br />
							<span className="text-gray-500">
								{latitude},{longitude}
							</span>
							<br />
							<a
								href={`https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`}
								target="_blank"
							>
								View on Map <i className="material-icons text-base">launch</i>
							</a>
						</div>
					)}
					<Link href={`/entities/places/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default PlaceAbout;
