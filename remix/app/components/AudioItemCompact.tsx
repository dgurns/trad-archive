import { useCallback, useMemo } from "react";
import { Link } from "@remix-run/react";
import { type Tune } from "@prisma/client";

import type { AudioItemWithRelations } from "~/types";
import { EntityStatus, EntityType } from "~/types";
import EntityService from "~/services/Entity";
import TagService from "~/services/Tag";
import usePlayerContext from "~/hooks/usePlayerContext";

import AddTagButton from "~/components/AddTagButton";
import EditTagsButton from "~/components/EditTagsButton";
import Menu from "~/components/Menu";
import SaveItemButton from "~/components/SaveItemButton";
import ViewCommentsButton from "~/components/ViewCommentsButton";
import RequestTakedownButton from "~/components/RequestTakedownButton";

interface Props {
	audioItem: AudioItemWithRelations;
	isSaved: boolean;
	className?: string;
}
const AudioItemCompact = ({ audioItem, isSaved, className }: Props) => {
	const { name, slug, description, tagsAsSubject, status } = audioItem;
	const isTakenDown = status === EntityStatus.TakenDown;
	const sortedTags = useMemo(
		() => TagService.sort(tagsAsSubject),
		[tagsAsSubject]
	);

	const { activeAudioItem, setActiveAudioItem } = usePlayerContext();

	const onPlayPressed = useCallback(() => {
		setActiveAudioItem(audioItem);
	}, [audioItem, setActiveAudioItem]);

	const playButtonMarkup = useMemo(() => {
		const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
		if (isTakenDown) {
			return <div className="text-gray-500">Taken Down</div>;
		}
		if (audioItemIsInPlayer) {
			return <div className="text-gray-500">Playing</div>;
		}
		return (
			<button
				style={{ lineHeight: 0 }}
				onClick={onPlayPressed}
				aria-label="Play"
			>
				<i className="material-icons text-teal-600 hover:text-teal-800">
					<span className="text-6xl">play_arrow</span>
				</i>
			</button>
		);
	}, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);

	return (
		<div
			className={`flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${
				className ?? ""
			}`}
		>
			<div className="flex justify-center items-center w-14 mr-3">
				{playButtonMarkup}
			</div>

			<div className="flex flex-1 flex-col overflow-hidden">
				<Link to={`/entities/audio-items/${slug}`}>{name}</Link>

				<div className="flex flex-row flex-wrap text-sm mt-1 mb-1">
					Tags:
					{sortedTags.map((tag, index) => {
						const objectEntity = TagService.getObjectEntity(tag);
						if (!objectEntity) {
							return null;
						}
						return (
							<div key={index} className="ml-1 whitespace-pre">
								<Link to={EntityService.makeHrefForView(objectEntity)}>
									{objectEntity.name}
									{objectEntity.entityType === EntityType.Tune
										? ` (${(objectEntity as Tune).type})`
										: ""}
								</Link>
								{index !== sortedTags.length - 1 && ", "}
							</div>
						);
					})}
					<AddTagButton entity={audioItem} className="ml-2" />
					{tagsAsSubject?.length > 0 && (
						<div className="flex ml-1">
							<span className="text-gray-500 mr-1">/</span>
							<EditTagsButton entity={audioItem} />
						</div>
					)}
				</div>

				{description && (
					<div className="text-gray-500 text-sm">{description}</div>
				)}

				<div className="border-t border-gray-200 mt-2 pt-1 w-full flex flex-row justify-between items-center">
					<div className="flex flex-row items-center">
						<ViewCommentsButton audioItem={audioItem} />

						<div className="ml-2">
							<SaveItemButton audioItem={audioItem} isSaved={isSaved} />
						</div>
					</div>

					<Menu>
						{!isTakenDown && <RequestTakedownButton entity={audioItem} />}
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default AudioItemCompact;
