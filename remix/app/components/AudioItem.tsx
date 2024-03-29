import type { AudioItemWithRelations } from "~/types";
import { ViewAs } from "~/types";

import AudioItemCard from "~/components/AudioItemCard";
import AudioItemCompact from "~/components/AudioItemCompact";
import AudioItemTextOnly from "~/components/AudioItemTextOnly";

interface Props {
	viewAs?: ViewAs;
	audioItem: AudioItemWithRelations;
	showTitle?: boolean;
	className?: string;
}

// AudioItem handles wrapping the different variants of AudioItem components. It
// returns the variant requested in the `viewAs` prop. Default is Card.
const AudioItemComponent = ({
	viewAs,
	audioItem,
	showTitle,
	className,
}: Props) => {
	if (viewAs === ViewAs.Cards) {
		return (
			<AudioItemCard
				audioItem={audioItem}
				showTitle={showTitle}
				className={className}
			/>
		);
	} else if (viewAs === ViewAs.Compact) {
		return <AudioItemCompact audioItem={audioItem} className={className} />;
	} else if (viewAs === ViewAs.List) {
		return <AudioItemTextOnly audioItem={audioItem} className={className} />;
	} else {
		return null;
	}
};

export default AudioItemComponent;
