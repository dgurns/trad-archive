import { useCallback, useMemo } from "react";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

import type { AudioItem, Tag, TakedownRequest } from "~/types";
import { EntityStatus, TakedownRequestStatus } from "~/types";
import DateTime from "~/services/DateTime";
import usePlayerContext from "~/hooks/usePlayerContext";

import Tags from "~/components/Tags";
import Menu from "~/components/Menu";
import SaveItemButton from "~/components/SaveItemButton";
import ViewCommentsButton from "~/components/ViewCommentsButton";
import TimeMarkers from "~/components/TimeMarkers";
import RequestTakedownButton from "~/components/RequestTakedownButton";

interface Props {
	audioItem: AudioItem;
	showTitle?: boolean;
	className?: string;
}
const AudioItemCard = ({ audioItem, showTitle = true, className }: Props) => {
	const { name, slug, description, tags, status, createdByUser, createdAt } =
		audioItem;

	const navigate = useNavigate();

	const {
		activeAudioItem,
		setActiveAudioItem,
		activeItemDurationSeconds,
		playbackPositionSeconds,
	} = usePlayerContext();

	const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
	const tagsWithTimeMarkers: Tag[] = useMemo(() => {
		if (!Array.isArray(tags)) {
			return [];
		}
		return tags.filter(
			(tag) => typeof tag.subjectTimeMarkerSeconds === "number"
		);
	}, [tags]);

	const onPlayPressed = useCallback(() => {
		setActiveAudioItem(audioItem);
	}, [audioItem]);

	const onTakedownRequestCreated = useCallback(
		(takedownRequest: TakedownRequest) => {
			if (takedownRequest.status === TakedownRequestStatus.Approved) {
				navigate(`/entities/audio-items/${slug}`);
			}
		},
		[navigate, slug]
	);

	const shouldShowPositionAndDuration =
		audioItemIsInPlayer &&
		typeof playbackPositionSeconds === "number" &&
		typeof activeItemDurationSeconds === "number";
	const positionAndDuration = `${DateTime.formatSecondsAsDuration(
		playbackPositionSeconds
	)} / ${DateTime.formatSecondsAsDuration(activeItemDurationSeconds)}`;

	const isTakenDown = status === EntityStatus.TakenDown;

	return (
		<div
			className={`flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${
				className ?? ""
			}`}
		>
			{showTitle && (
				<h2 className="mb-2">
					<Link to={`/entities/audio-items/${slug}`}>
						<a className="link-bare">{name}</a>
					</Link>
				</h2>
			)}

			<div className="mb-4">
				<Tags entity={audioItem} />
			</div>

			<div className="flex flex-col w-full border border-gray-200 rounded mb-2">
				{isTakenDown ? (
					<div className="flex flex-row items-center px-4 py-6 text-gray-500">
						This Audio Item has been removed via an approved Takedown Request
					</div>
				) : (
					<>
						<div className="flex flex-row justify-start items-center pr-4 h-16">
							<div className="flex flex-1">
								{audioItemIsInPlayer ? (
									<div className="pl-4 text-gray-500">Playing</div>
								) : (
									<button
										style={{ lineHeight: 0 }}
										onClick={onPlayPressed}
										aria-label="Play"
									>
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
						</div>
					</>
				)}
				{tagsWithTimeMarkers.length > 0 && (
					<div className="mx-4 mb-2 pt-3 border-t border-gray-200">
						<TimeMarkers audioItem={audioItem} />
					</div>
				)}
			</div>

			<div className="mt-4">
				<div className="text-gray-500 text-sm flex flex-col sm:flex-row">
					Added
					{createdByUser && (
						<>
							{" "}
							by{" "}
							<Link to={`/users/${createdByUser.id}`}>
								<a className="flex flex-row px-0 sm:px-1">
									{createdByUser.verifiedPerson && (
										<div className="inline">
											<i className="material-icons text-sm mr-1">verified</i>
										</div>
									)}
									{createdByUser.username}
								</a>
							</Link>
						</>
					)}{" "}
					{DateTime.formatDateYearTime(createdAt)}
				</div>
				<div className="text-sm mt-1 text-gray-900 whitespace-pre-wrap">
					{description || "No description"}
				</div>
			</div>

			<div className="border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center">
				<div className="flex flex-row items-center">
					<ViewCommentsButton audioItem={audioItem} />

					<div className="ml-2">
						<SaveItemButton audioItem={audioItem} />
					</div>
				</div>

				<Menu>
					{!isTakenDown && (
						<RequestTakedownButton
							entity={audioItem}
							onTakedownRequestCreated={onTakedownRequestCreated}
						/>
					)}
				</Menu>
			</div>
		</div>
	);
};

export default AudioItemCard;
