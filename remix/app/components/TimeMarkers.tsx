import { useCallback, useMemo } from "react";
import { Link } from "@remix-run/react";

import type { AudioItem, Tag } from "~/types";
import { EntityType } from "~/types";
import DateTime from "~/services/DateTime";
import Entity from "~/services/Entity";
import usePlayerContext from "~/hooks/usePlayerContext";

interface Props {
	audioItem: AudioItem;
}
const TimeMarkers = ({ audioItem }: Props) => {
	const { tags } = audioItem;

	const {
		activeAudioItem,
		setActiveAudioItem,
		playbackPositionSeconds,
		setSeekPositionSeconds,
	} = usePlayerContext();

	type TimeMarkersWithTags = {
		[timeMarker: string]: Tag[];
	};
	const timeMarkersWithTags: TimeMarkersWithTags = useMemo(() => {
		const output: Record<number, Tag[]> = {};
		if (!tags) {
			return output;
		}
		// Filter out tags without time markers
		const filteredTags = tags.filter(
			(tag) => typeof tag.subjectTimeMarkerSeconds === "number"
		);
		// Sort array so that time markers are ascending, and thus object keys will
		// be created in ascending order
		filteredTags.sort(
			(a, b) =>
				a.subjectTimeMarkerSeconds ?? 0 - (b.subjectTimeMarkerSeconds ?? 0)
		);
		filteredTags.forEach((tag) => {
			if (typeof tag.subjectTimeMarkerSeconds !== "number") {
				return;
			}
			const existingTagsAtTimeMarker: Tag[] | undefined =
				output[tag.subjectTimeMarkerSeconds] ?? [];
			output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
		});
		return output;
	}, [tags]);

	const onTimeMarkerClicked = useCallback(
		(event, timeMarker) => {
			if (event.target.id === "time-marker-tag-link") {
				event.stopPropagation();
				return;
			}
			if (activeAudioItem?.id !== audioItem.id) {
				setActiveAudioItem(audioItem);
			}
			setSeekPositionSeconds(parseInt(timeMarker));
		},
		[audioItem, activeAudioItem, setActiveAudioItem, setSeekPositionSeconds]
	);

	const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
	const activeTimeMarker: string | undefined = useMemo(() => {
		if (!audioItemIsInPlayer) {
			return undefined;
		}
		let result: string | undefined;
		Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
			if (parseInt(timeMarker) <= (playbackPositionSeconds ?? 0)) {
				result = timeMarker;
			}
		});
		return result;
	}, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);

	return (
		<div className="flex flex-col">
			{Object.entries(timeMarkersWithTags).map(
				([timeMarker, tagsAtTimeMarker], index) => {
					const isActive = activeTimeMarker === timeMarker;
					return (
						<div
							className="flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm"
							key={index}
						>
							<div className="flex flex-row w-16 flex-shrink-0">
								<div className="w-3 text-left">{isActive && ">"}</div>
								<button
									className="link"
									onClick={(event) => onTimeMarkerClicked(event, timeMarker)}
								>
									{DateTime.formatSecondsAsDuration(parseInt(timeMarker))}
								</button>
							</div>
							<div className="flex flex-col md:flex-row">
								{tagsAtTimeMarker.map((tag, index) => (
									<span className="flex flex-row items-center" key={index}>
										<Link
											to={Entity.makeHrefForView(tag.objectEntity)}
											id="time-marker-tag-link"
										>
											{tag.objectEntity.name}
											{tag.objectEntity.entityType === EntityType.Tune
												? ` (${tag.objectEntity.type})`
												: ""}
										</Link>
										{index !== tagsAtTimeMarker.length - 1 && (
											<span className="hidden md:block mr-1">,</span>
										)}
									</span>
								))}
							</div>
						</div>
					);
				}
			)}
		</div>
	);
};

export default TimeMarkers;
