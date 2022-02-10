import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

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

	const { ref: metadataRef, inView: metadataInView } = useInView({
		initialInView: true,
	});

	const [totalAudioItems, setTotalAudioItems] = useState<number | undefined>();

	const { Filters, filtersProps, page, perPage, viewAs } = useFilters({
		defaultPage: 1,
		totalItems: totalAudioItems,
		defaultPerPage: PerPage.Twenty,
		defaultViewAs: ViewAs.Card,
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

	const headerOffset =
		window.document.getElementById("header")?.offsetHeight + 12 ?? 0;

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
					<Link href={EntityService.makeHrefForAbout(entity)}>
						<a className="ml-4">About</a>
					</Link>
					<Link href={EntityService.makeHrefForTags(entity)}>
						<a className="ml-4">Tags</a>
					</Link>
				</div>
				{totalAudioItems > 0 && (
					<div ref={filtersRef}>
						<Filters {...filtersProps} />
					</div>
				)}
			</div>

			{audioItemsLoading && <LoadingBlock />}

			{totalAudioItems > 0 &&
				audioItems.map((audioItem, index) => (
					<AudioItem
						viewAs={viewAs}
						audioItem={audioItem}
						key={index}
						className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
					/>
				))}

			{audioItemsError && (
				<div className="text-red-600">Error fetching Audio Items</div>
			)}

			{/* Fixed overlay metadata when scrolling. Render after AudioItems so it takes z-index precedence */}
			<div
				className={`${
					metadataInView ? "hidden" : "visible"
				} fixed top-0 left-0 right-0 p-4 pt-[${headerOffset}px] bg-gray-100 shadow-lg`}
			>
				{totalAudioItems > 0 && <Filters {...filtersProps} />}
			</div>
		</div>
	);
};

export default ViewEntity;
