import { ViewAs, type AudioItemWithTags } from "~/types";
import AudioItemCard from "~/components/AudioItemCard";

interface Props {
	viewAs?: ViewAs;
	audioItem: AudioItemWithTags;
	showTitle?: boolean;
	className?: string;
}

// AudioItem handles wrapping the different variants of AudioItem components. It
// returns the variant requested in the `viewAs` prop. Default is Card.
export default function AudioItemComponent({
	viewAs = ViewAs.Cards,
	audioItem,
	showTitle,
	className,
}: Props) {
	if (viewAs === ViewAs.Cards) {
		return (
			<AudioItemCard
				audioItem={audioItem}
				showTitle={showTitle}
				className={className}
			/>
		);
	} else {
		return null;
	}
}
