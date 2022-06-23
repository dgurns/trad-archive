import { useState, useCallback } from "react";
import { useFetcher, useLocation } from "@remix-run/react";
import type { AudioItem } from "@prisma/client";

import useRequireLogin from "~/hooks/useRequireLogin";
import EntityService from "~/services/Entity";

interface Props {
	parentAudioItem: AudioItem;
}
const CreateCommentForm = ({ parentAudioItem }: Props) => {
	const fetcher = useFetcher();
	const { pathname } = useLocation();
	const { currentUser, requireLogin } = useRequireLogin();

	const [text, setText] = useState("");

	const onSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			if (!currentUser) {
				const redirectTo = EntityService.makeHrefForView(parentAudioItem);
				return await requireLogin({ redirectTo });
			}

			fetcher.submit(
				{ parentAudioItemId: parentAudioItem.id, text },
				{ method: "post" }
			);
			fetcher.load(pathname);
		},
		[parentAudioItem, text, currentUser, fetcher, requireLogin, pathname]
	);

	return (
		<fetcher.Form onSubmit={onSubmit} className="w-full">
			<textarea
				placeholder="Add a comment..."
				autoFocus
				value={text}
				rows={3}
				onChange={(event) => setText(event.target.value)}
			/>
			{text.length > 0 && (
				<input
					className="btn mt-3 w-auto"
					type="submit"
					disabled={fetcher.state === "loading"}
					value="Add Comment"
				/>
			)}
			{fetcher.data?.error && (
				<div className="text-red-600 mt-3">{fetcher.data.error.message}</div>
			)}
		</fetcher.Form>
	);
};

export default CreateCommentForm;
