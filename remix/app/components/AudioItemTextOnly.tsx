import { useCallback, useMemo } from "react";
import { Link } from "@remix-run/react";

import type { AudioItemWithRelations } from "~/types";
import { EntityStatus } from "~/types";
import EntityService from "~/services/Entity";
import TagService from "~/services/Tag";
import usePlayerContext from "~/hooks/usePlayerContext";

interface Props {
	audioItem: AudioItemWithRelations;
	className?: string;
}
const AudioItemTextOnly = ({ audioItem, className }: Props) => {
	const { name, slug, tagsAsSubject, status } = audioItem;
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
					<span className="text-3xl">play_arrow</span>
				</i>
			</button>
		);
	}, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);

	return (
		<div
			className={`flex flex-row justify-start items-start ${className ?? ""}`}
		>
			<div className="flex justify-center items-center w-14 mr-3">
				{playButtonMarkup}
			</div>

			<div className="flex flex-1 flex-col overflow-hidden">
				<Link to={`/entities/audio-items/${slug}`}>{name}</Link>

				<div className="flex flex-row flex-wrap text-sm mt-1 mb-1">
					<span className="text-gray-500">Tags:</span>
					{sortedTags.map((tag, index) => {
						const objectEntity = TagService.getObjectEntity(tag);
						return (
							<div key={index} className="ml-1 whitespace-pre">
								<Link to={EntityService.makeHrefForView(objectEntity)}>
									{objectEntity?.name}
								</Link>
								{index !== sortedTags.length - 1 && ", "}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default AudioItemTextOnly;
