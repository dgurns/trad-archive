import { useFetcher } from "@remix-run/react";
import type { AudioItem } from "@prisma/client";

interface Props {
	parentAudioItem: AudioItem;
}
const CreateCommentForm = ({ parentAudioItem }: Props) => {
	const fetcher = useFetcher();

	return (
		<fetcher.Form method="post" action="/comments" className="w-full">
			<textarea
				placeholder="Add a comment..."
				autoFocus
				rows={3}
				required
				minLength={1}
				name="text"
			/>
			<input
				className="btn mt-3 w-auto"
				type="submit"
				disabled={fetcher.state === "submitting"}
				value="Add Comment"
			/>
			{fetcher.data?.error && (
				<div className="text-red-600 mt-3">{fetcher.data.error.message}</div>
			)}
		</fetcher.Form>
	);
};

export default CreateCommentForm;
