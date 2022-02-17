import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { Instrument } from "types";
import TagService from "services/Tag";
import { INSTRUMENT_QUERY } from "pages/entities/instruments/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const InstrumentTags = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, error, refetch } = useQuery<{
		instrument: Instrument;
	}>(INSTRUMENT_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { instrument } = data ?? {};
	const { name, tags } = instrument ?? {};
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Instruments", href: "/entities/instruments" },
							{ label: name, href: `/entities/instruments/${slug}` },
							{ label: "Tags" },
						]}
						className="mb-6"
					/>

					{sortedTags.map((tag, index) => (
						<TagWithRelationshipToObject
							tag={tag}
							key={index}
							className="mb-4"
						/>
					))}
					<div>
						<AddTagButton entity={instrument} onSuccess={refetch} />
						{sortedTags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={instrument} onSuccess={refetch} />
							</>
						)}
					</div>
				</>
			)}
		</Layout>
	);
};

export default InstrumentTags;
