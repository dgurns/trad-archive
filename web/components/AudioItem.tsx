import { AudioItem, ViewAs } from "types";

import AudioItemCard from "components/AudioItemCard";
import AudioItemCompact from "components/AudioItemCompact";

interface Props {
	viewAs?: ViewAs;
	audioItem: AudioItem;
	showTitle?: boolean;
	className?: string;
}

// AudioItem handles wrapping the different variants of AudioItem components. It
// returns the variant requested in the `viewAs` prop. Default is Card.
const AudioItemComponent = ({
	viewAs = ViewAs.Card,
	audioItem,
	showTitle,
	className,
}: Props) => {
	if (viewAs === ViewAs.Card) {
		return (
			<AudioItemCard
				audioItem={audioItem}
				showTitle={showTitle}
				className={className}
			/>
		);
	} else if (viewAs === ViewAs.Compact) {
		return <AudioItemCompact audioItem={audioItem} className={className} />;
	} else {
		return null;
	}
};

export default AudioItemComponent;
