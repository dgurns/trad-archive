import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { Tune } from "types";

import Layout from "components/Layout";
import { TUNE_QUERY } from "pages/entities/tunes/[slug]";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const TuneAbout = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, error } = useQuery<{
		tune: Tune;
	}>(TUNE_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, aliases, theSessionTuneId, type, meter, mode, abc } =
		data?.tune ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Tunes", href: "/entities/tunes" },
							{ label: name, href: `/entities/tunes/${slug}` },
							{ label: "About" },
						]}
						className="mb-6"
					/>
					{theSessionTuneId && (
						<div className="mb-4">
							<div className="italic text-gray-500">
								We source all of our Tune data from a wonderful community
								project called The Session.
							</div>
							<a
								href={`https://thesession.org/tunes/${theSessionTuneId}`}
								target="_blank"
							>
								View or Edit This Tune on The Session{" "}
								<i className="material-icons text-sm">launch</i>
							</a>
						</div>
					)}
					{aliases && (
						<div className="mb-4">
							Aliases:
							<br />
							<span className="text-gray-500">{aliases}</span>
						</div>
					)}
					{type && (
						<div className="mb-4">
							Type:
							<br />
							<span className="text-gray-500">{type}</span>
						</div>
					)}
					{meter && (
						<div className="mb-4">
							Meter:
							<br />
							<span className="text-gray-500">{meter}</span>
						</div>
					)}
					{mode && (
						<div className="mb-4">
							Mode:
							<br />
							<span className="text-gray-500">{mode}</span>
						</div>
					)}
					{abc && (
						<div className="mb-4">
							ABC:
							<br />
							<span className="text-gray-500">{abc}</span>
						</div>
					)}
					<Link href={`/entities/tunes/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default TuneAbout;
