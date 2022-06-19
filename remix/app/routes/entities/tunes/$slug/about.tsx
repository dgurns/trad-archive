import { useQuery } from "@apollo/client";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

import type { Tune } from "~/types";

import Layout from "~/components/Layout";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";

const TuneAbout = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { name, aliases, theSessionTuneId, type, meter, mode, abc } =
		data?.tune ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
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
								rel="noreferrer"
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
					<Link to={`/entities/tunes/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default TuneAbout;
