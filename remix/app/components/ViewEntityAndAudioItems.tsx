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

	const { ref: metadataRef, inView: metadataInView } = useInView({
		initialInView: true,
	});

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const viewAs = queryParams.get("viewAs") as ViewAs;

	const { Filters, filtersProps } = useFilters({
		totalItems: totalAudioItems,
	});
	const filtersRef = useRef<HTMLDivElement>(null);

	return (
		<div className={`flex flex-1 flex-col mb-8 ${className ?? ""}`}>
			{/* Initial metadata at top of page */}
			<div className="mb-6" ref={metadataRef}>
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
						{totalAudioItems ?? ""} Audio Item{totalAudioItems === 1 ? "" : "s"}
					</span>
					<Link to={EntityService.makeHrefForAbout(entity)} className="ml-4">
						About
					</Link>
					<Link to={EntityService.makeHrefForTags(entity)} className="ml-4">
						Tags
					</Link>
				</div>
				{totalAudioItems > 0 && (
					<div ref={filtersRef}>
						<Filters {...filtersProps} />
					</div>
				)}
			</div>
			{totalAudioItems > 0 &&
				audioItems.map((audioItem, index) => (
					<AudioItem
						viewAs={viewAs ?? ViewAs.Cards}
						audioItem={audioItem}
						key={index}
						className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
					/>
				))}

			{/* Fixed overlay metadata when scrolling. Render after AudioItems so it takes z-index precedence */}
			<div
				className={`${
					metadataInView ? "hidden" : "visible"
				} fixed left-0 right-0 p-4 bg-gray-100 shadow-lg top-[48px]`}
			>
				{totalAudioItems > 0 && <Filters {...filtersProps} />}
			</div>
		</div>
	);
};

export default ViewEntityAndAudioItems;
