import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { AudioItem } from "types";

import Layout from "components/Layout";
import { AUDIO_ITEM_QUERY } from "pages/entities/audio-items/[slug]";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const AudioItemAbout = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, error } = useQuery<{
		audioItem: AudioItem;
	}>(AUDIO_ITEM_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, description, aliases, itmaAtomSlug } = data?.audioItem ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Audio Items", href: "/entities/audio-items" },
							{ label: name, href: `/entities/audio-items/${slug}` },
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
							>
								View on AtoM <i className="material-icons text-sm">launch</i>
							</a>
						</div>
					)}
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
					<Link href={`/entities/audio-items/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default AudioItemAbout;
