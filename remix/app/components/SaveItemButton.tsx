import { useFetcher } from "@remix-run/react";
import { type AudioItemWithRelations } from "~/types";

interface Props {
	audioItem: AudioItemWithRelations;
}
export default function SaveItemButton({ audioItem }: Props) {
	const fetcher = useFetcher<{ error?: string; ok: boolean }>();

	function onButtonClicked() {
		fetcher.submit(
			{ audioItemId: audioItem.id },
			{ method: "post", action: "/saved-items" }
		);
	}

	const isSaved = audioItem.savedItems.length === 1;

	return (
		<button
			className={`btn-secondary ${
				isSaved ? "btn-secondary-active" : ""
			} pl-0.5`}
			onClick={onButtonClicked}
			disabled={fetcher.state !== "idle"}
			aria-label={isSaved ? "Unsave" : "Save"}
		>
			{isSaved ? (
				<>
					<i className="material-icons">bookmark</i>
					Saved
				</>
			) : (
				<>
					<i className="material-icons">bookmark_border</i>
					Save
				</>
			)}
		</button>
	);
}
