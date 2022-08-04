import { useLocation } from "@remix-run/react";

import type { AudioItemWithRelations, Entity } from "~/types";
import { SortBy } from "~/types";
import { ViewAs } from "~/types";
import useFilters from "~/hooks/useFilters";
import EntityService from "~/services/Entity";

import Breadcrumb from "~/components/Breadcrumb";
import AudioItem from "~/components/AudioItem";
import type { Tune } from "@prisma/client";
import { EntityType } from "@prisma/client";

interface Props {
	entity: Entity;
	audioItems: AudioItemWithRelations[];
	totalAudioItems: number;
	className?: string;
}
const ViewEntityAndAudioItems = ({
	entity,
	audioItems,
	totalAudioItems,
	className,
}: Props) => {
	const { name } = entity ?? {};

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const viewAs = queryParams.get("viewAs") as ViewAs;

	const { Filters, filtersProps } = useFilters({
		totalItems: totalAudioItems,
	});

	return (
		<div className={`flex flex-1 flex-col ${className ?? ""}`}>
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

			<div className="text-gray-500 text-sm flex-col space-y-2">
				{entity.description && <p>{entity.description}</p>}
				{entity.aliases && <p>Also known as: {entity.aliases}</p>}
				{entity.entityType === EntityType.Tune && (
					<>
						<p>Type: {(entity as Tune).type}</p>
						<p>Meter: {(entity as Tune).meter}</p>
						<p>Mode: {(entity as Tune).mode}</p>
						<p>ABC: {(entity as Tune).abc}</p>
						<p>
							<a
								href={`https://thesession.org/tunes/${
									(entity as Tune).theSessionTuneId
								}`}
								target="_blank"
								rel="noreferrer"
							>
								View or Edit This Tune on The Session ↗
							</a>
						</p>
					</>
				)}
			</div>

			{totalAudioItems > 0 && (
				<>
					<div className="sticky py-3 px-2 mt-4 -ml-2 -mr-2 mb-2 bg-gray-100 top-[48px]">
						<Filters
							{...filtersProps}
							sortByOptions={[SortBy.DateAddedOldToNew]}
							sortBy={SortBy.DateAddedOldToNew}
						/>
					</div>
					{audioItems.map((audioItem, index) => (
						<AudioItem
							viewAs={viewAs ?? ViewAs.Cards}
							audioItem={audioItem}
							key={index}
							className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default ViewEntityAndAudioItems;
