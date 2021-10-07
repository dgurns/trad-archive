import { AudioItem, ViewAsValue } from "types";

import AudioItemCard from "components/AudioItemCard";
import AudioItemCompact from "components/AudioItemCompact";

interface Props {
	viewAs?: ViewAsValue;
	audioItem: AudioItem;
	showTitle?: boolean;
	className?: string;
}

// AudioItem handles wrapping the different variants of AudioItem components. It
// returns the variant requested in the `viewAs` prop. Default is Card.
const AudioItemComponent = ({
	viewAs = ViewAsValue.Card,
	audioItem,
	showTitle,
	className,
}: Props) => {
	if (viewAs === ViewAsValue.Card) {
		return (
			<AudioItemCard
				audioItem={audioItem}
				showTitle={showTitle}
				className={className}
			/>
		);
	} else if (viewAs === ViewAsValue.Compact) {
		return <AudioItemCompact audioItem={audioItem} className={className} />;
	} else {
		return null;
	}
};

export default AudioItemComponent;
