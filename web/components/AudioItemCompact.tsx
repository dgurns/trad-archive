import { useCallback, useMemo } from "react";
import Link from "next/link";

import { AudioItem, EntityStatus } from "types";
import EntityService from "services/Entity";
import TagService from "services/Tag";
import usePlayerContext from "hooks/usePlayerContext";

import AddTagButton from "components/AddTagButton";
import Menu from "components/Menu";
import SaveItemButton from "components/SaveItemButton";
import ViewCommentsButton from "components/ViewCommentsButton";
import RequestTakedownButton from "components/RequestTakedownButton";

interface Props {
	audioItem: AudioItem;
	className?: string;
}
const AudioItemCompact = ({ audioItem, className }: Props) => {
	const { name, slug, description, tags, status } = audioItem;
	const isTakenDown = status === EntityStatus.TakenDown;
	const sortedTags = useMemo(() => TagService.sort(tags), [tags]);

	const { activeAudioItem, setActiveAudioItem } = usePlayerContext();

	const onPlayPressed = useCallback(() => {
		setActiveAudioItem(audioItem);
	}, [audioItem]);

	const playButtonMarkup = useMemo(() => {
		const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
		if (isTakenDown) {
			return <div className="text-gray-500">Taken Down</div>;
		}
		if (audioItemIsInPlayer) {
			return <div className="text-gray-500">Playing</div>;
		}
		return (
			<button style={{ lineHeight: 0 }} onClick={onPlayPressed}>
				<i className="material-icons text-6xl text-teal-600 hover:text-teal-800">
					play_arrow
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
				<Link href={`/entities/audio-items/${slug}`}>{name}</Link>

				<div className="text-sm mt-1 mb-1">
					Tags:{" "}
					{sortedTags.map((tag, index) => (
						<>
							<Link href={EntityService.makeHrefForView(tag.objectEntity)}>
								{tag.objectEntity.name}
							</Link>
							{index !== sortedTags.length - 1 && ", "}
						</>
					))}
					<AddTagButton entity={audioItem} className="ml-2" />
				</div>

				{description && (
					<div className="text-gray-500 text-sm">{description}</div>
				)}

				<div className="border-t border-gray-200 mt-2 pt-1 w-full flex flex-row justify-between items-center">
					<div className="flex flex-row items-center">
						<ViewCommentsButton audioItem={audioItem} />

						<div className="ml-2">
							<SaveItemButton audioItem={audioItem} />
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
