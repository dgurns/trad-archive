import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { AudioItem, Tag } from "types";
import DateTime from "services/DateTime";
import usePlayerContext from "hooks/usePlayerContext";

import Tags from "components/Tags";
import Menu from "components/Menu";
import AddToCollection from "components/AddToCollection";
import ViewComments from "components/ViewComments";
import TimeMarkers from "components/TimeMarkers";

interface Props {
	audioItem: AudioItem;
}
const AudioItemComponent = ({ audioItem }: Props) => {
	const { name, slug, description, tags, createdByUser, createdAt } = audioItem;

	const {
		activeAudioItem,
		setActiveAudioItem,
		activeItemDurationSeconds,
		playbackPositionSeconds,
	} = usePlayerContext();

	const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
	const tagsWithTimeMarkers: Tag[] = useMemo(
		() =>
			tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number"),
		[tags]
	);
	const shouldShowTimeMarkersIcon = tagsWithTimeMarkers.length > 0;

	const [shouldShowTimeMarkers, setShouldShowTimeMarkers] = useState(false);

	const onPlayPressed = useCallback(() => {
		setActiveAudioItem(audioItem);
	}, [audioItem]);

	const onTimeMarkersIconClicked = useCallback(() => {
		setShouldShowTimeMarkers(!shouldShowTimeMarkers);
	}, [shouldShowTimeMarkers]);

	// Show time markers if they exist and the AudioItem is in the player
	useEffect(() => {
		if (audioItemIsInPlayer && tagsWithTimeMarkers.length > 0) {
			setShouldShowTimeMarkers(true);
		}
	}, [audioItemIsInPlayer, tagsWithTimeMarkers]);

	const shouldShowPositionAndDuration =
		audioItemIsInPlayer &&
		typeof playbackPositionSeconds === "number" &&
		typeof activeItemDurationSeconds === "number";
	const positionAndDuration = `${DateTime.formatSecondsAsDuration(
		playbackPositionSeconds
	)} / ${DateTime.formatSecondsAsDuration(activeItemDurationSeconds)}`;

	return (
		<div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 mb-8">
			<Link href={`/entities/audio-items/${slug}`}>
				<a className="mb-2 link-h1">{name}</a>
			</Link>

			<div className="mb-4">
				<Tags entity={audioItem} />
			</div>

			<div className="flex flex-col w-full border border-gray-200 rounded mb-2">
				<div className="flex flex-row justify-start items-center pr-4 h-16">
					<div className="flex flex-1">
						{audioItemIsInPlayer ? (
							<div className="pl-4 text-gray-500">Playing</div>
						) : (
							<button style={{ lineHeight: 0 }} onClick={onPlayPressed}>
								<i className="material-icons text-6xl text-teal-600 hover:text-teal-800">
									play_arrow
								</i>
							</button>
						)}

						<div
							className={`ml-4 text-gray-500 opacity-0 ${
								shouldShowPositionAndDuration
									? "opacity-100 transition-opacity delay-500 duration-400"
									: ""
							}`}
						>
							{positionAndDuration}
						</div>
					</div>

					{shouldShowTimeMarkersIcon && (
						<button
							className="btn-secondary flex flex-row items-center"
							onClick={onTimeMarkersIconClicked}
						>
							<i className="material-icons">format_list_bulleted</i>
						</button>
					)}
				</div>

				{shouldShowTimeMarkers && (
					<div className="mx-4 mb-4 pt-4 border-t border-gray-200">
						<TimeMarkers audioItem={audioItem} />
					</div>
				)}
			</div>

			<div className="mt-4">
				<div className="text-gray-500 text-sm">
					Added by{" "}
					<Link href={`/users/${createdByUser.id}`}>
						{createdByUser.username}
					</Link>{" "}
					{DateTime.formatDateYearTime(createdAt)}
				</div>
				<div className="text-sm mt-1">{description}</div>
			</div>

			<div className="border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center">
				<div className="flex flex-row items-center">
					<ViewComments audioItem={audioItem} />
					<div className="ml-2">
						<AddToCollection audioItem={audioItem} />
					</div>
				</div>

				<Menu>
					<span className="flex flex-row items-center">
						<i className="material-icons-outlined mr-0.5">report_problem</i>
						Request Takedown
					</span>
				</Menu>
			</div>
		</div>
	);
};

export default AudioItemComponent;
