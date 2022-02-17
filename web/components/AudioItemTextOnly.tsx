import { useCallback, useMemo } from "react";
import Link from "next/link";

import { AudioItem, EntityStatus } from "types";
import EntityService from "services/Entity";
import TagService from "services/Tag";
import usePlayerContext from "hooks/usePlayerContext";

interface Props {
	audioItem: AudioItem;
	className?: string;
}
const AudioItemTextOnly = ({ audioItem, className }: Props) => {
	const { name, slug, tags, status } = audioItem;
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
			<button
				style={{ lineHeight: 0 }}
				onClick={onPlayPressed}
				aria-label="Play"
			>
				<i className="material-icons text-2xl text-teal-600 hover:text-teal-800">
					play_arrow
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
				<Link href={`/entities/audio-items/${slug}`}>{name}</Link>

				<div className="flex flex-row flex-wrap text-sm mt-1 mb-1">
					<span className="text-gray-500">Tags:</span>
					{sortedTags.map((tag, index) => (
						<div key={index} className="ml-1 whitespace-pre">
							<Link href={EntityService.makeHrefForView(tag.objectEntity)}>
								{tag.objectEntity.name}
							</Link>
							{index !== sortedTags.length - 1 && ", "}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AudioItemTextOnly;
