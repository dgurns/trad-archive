import { useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { useInView } from "react-intersection-observer";

import type { AudioItemWithRelations, Entity } from "~/types";
import { ViewAs } from "~/types";
import useFilters from "~/hooks/useFilters";
import EntityService from "~/services/Entity";

import Breadcrumb from "~/components/Breadcrumb";
import AudioItem from "~/components/AudioItem";

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

			<div className="text-gray-500 text-sm">{entity.description}</div>

			{totalAudioItems > 0 && (
				<>
					<div className="sticky py-3 px-2 mt-4 -ml-2 -mr-2 mb-2 bg-gray-100 top-[48px] z-10">
						<Filters {...filtersProps} />
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
