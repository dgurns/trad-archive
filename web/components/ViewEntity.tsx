import { useEffect, useState } from "react";
import Link from "next/link";

import { Entity, PerPage, ViewAs } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import useFilters from "hooks/useFilters";
import EntityService from "services/Entity";

import LoadingBlock from "components/LoadingBlock";
import Breadcrumb from "components/Breadcrumb";
import AudioItem from "components/AudioItem";

interface Props {
	entity: Entity;
	className?: string;
}
const ViewEntity = ({ entity, className }: Props) => {
	const { name } = entity ?? {};

	const [totalAudioItems, setTotalAudioItems] = useState<number | undefined>();

	const { Filters, filtersProps, page, perPage, viewAs } = useFilters({
		defaultPage: 1,
		totalItems: totalAudioItems,
		defaultPerPage: PerPage.Twenty,
		defaultViewAs: ViewAs.Card,
	});

	const {
		audioItems = [],
		total,
		query: { loading: audioItemsLoading, error: audioItemsError },
	} = useAudioItemsTaggedWithEntity({
		entity,
		page,
		perPage: perPage as number,
	});
	useEffect(() => {
		if (typeof total === "number") {
			setTotalAudioItems(total);
		}
	}, [total]);

	return (
		<div className={`flex flex-1 flex-col mb-8 ${className ?? ""}`}>
			<Breadcrumb
				items={[
					{
						label: EntityService.makeReadableNamePlural(entity),
						href: EntityService.makeHrefForTopLevel(entity),
					},
					{ label: name },
				]}
				className="mb-2"
			/>
			<div className="flex flex-row mb-6">
				<span className="text-gray-500">
					{totalAudioItems ?? ""} Audio Items
				</span>
				<Link href={EntityService.makeHrefForAbout(entity)}>
					<a className="ml-4">About</a>
				</Link>
				<Link href={EntityService.makeHrefForTags(entity)}>
					<a className="ml-4">Tags</a>
				</Link>
			</div>

			{!totalAudioItems && audioItemsLoading && <LoadingBlock />}

			{totalAudioItems > 0 && (
				<>
					<Filters {...filtersProps} className="mb-6" />
					{audioItemsLoading ? (
						<LoadingBlock />
					) : (
						audioItems.map((audioItem, index) => (
							<AudioItem
								viewAs={viewAs}
								audioItem={audioItem}
								key={index}
								className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
							/>
						))
					)}
				</>
			)}

			{audioItemsError && (
				<div className="text-red-600">Error fetching Audio Items</div>
			)}
		</div>
	);
};

export default ViewEntity;
