import { useFetcher } from "@remix-run/react";
import type { AudioItem, Comment } from "@prisma/client";
import { useEffect, useRef } from "react";

interface Props {
	parentAudioItem: AudioItem;
}
const CreateCommentForm = ({ parentAudioItem }: Props) => {
	const formRef = useRef<HTMLFormElement>(null);
	const fetcher = useFetcher<{ error?: string; comment?: Comment }>();

	useEffect(() => {
		if (fetcher.type === "done" && fetcher.data.comment) {
			formRef.current?.reset();
		}
	}, [fetcher]);

	return (
		<fetcher.Form
			ref={formRef}
			method="post"
			action="/comments"
			className="w-full"
		>
			<textarea
				placeholder="Add a comment..."
				autoFocus
				rows={3}
				required
				minLength={1}
				name="text"
			/>
			<input
				type="hidden"
				name="parentAudioItemId"
				value={parentAudioItem.id}
			/>
			<button
				className="btn mt-3 w-auto"
				type="submit"
				disabled={fetcher.state !== "idle"}
			>
				Add Comment
			</button>
			{fetcher.data?.error && (
				<div className="text-red-600 mt-3">{fetcher.data.error}</div>
			)}
		</fetcher.Form>
	);
};

export default CreateCommentForm;
