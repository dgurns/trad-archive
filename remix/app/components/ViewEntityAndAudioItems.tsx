import { useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { useInView } from "react-intersection-observer";

import type { AudioItemWithRelations, Entity } from "~/types";
import { PerPage, ViewAs } from "~/types";
import useFilters from "~/hooks/useFilters";
import EntityService from "~/services/Entity";

import Breadcrumb from "~/components/Breadcrumb";
import AudioItem from "~/components/AudioItem";

interface Props {
	entity: Entity;
	audioItems: AudioItemWithRelations[];
	className?: string;
}
const ViewEntityAndAudioItems = ({ entity, audioItems, className }: Props) => {
	const { name } = entity ?? {};
	const totalAudioItems = audioItems.length;

	const { ref: metadataRef, inView: metadataInView } = useInView({
		initialInView: true,
	});

	const { Filters, filtersProps, page, perPage, viewAs } = useFilters({
		defaultPage: 1,
		totalItems: audioItems.length,
		defaultPerPage: PerPage.Twenty,
		defaultViewAs: ViewAs.Cards,
	});
	const filtersRef = useRef<HTMLDivElement>(null);

	// Scroll to the top after choosing a different page of results
	useEffect(() => {
		if (filtersRef.current) {
			filtersRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [page, filtersRef]);

	const headerOffset =
		typeof document !== "undefined"
			? document.getElementById("header")?.offsetHeight
			: 0;

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
						viewAs={viewAs}
						audioItem={audioItem}
						key={index}
						className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
					/>
				))}

			{/* Fixed overlay metadata when scrolling. Render after AudioItems so it takes z-index precedence */}
			<div
				className={`${
					metadataInView ? "hidden" : "visible"
				} fixed left-0 right-0 p-4 bg-gray-100 shadow-lg`}
				style={{ top: `${headerOffset}px` }}
			>
				{totalAudioItems > 0 && <Filters {...filtersProps} />}
			</div>
		</div>
	);
};

export default ViewEntityAndAudioItems;
