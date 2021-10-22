import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useLazyQuery, gql } from "@apollo/client";

import { AUDIO_ITEM_QUERY } from "hooks/useAudioItem";
import useRequireLogin from "hooks/useRequireLogin";
import useSavedItemsForUser from "hooks/useSavedItemsForUser";
import { AudioItem, SavedItem } from "types";
import EntityService from "services/Entity";

const CREATE_SAVED_ITEM_MUTATION = gql`
	mutation CreateSavedItem($input: CreateSavedItemInput!) {
		createSavedItem(input: $input) {
			id
		}
	}
`;
const DELETE_SAVED_ITEM_MUTATION = gql`
	mutation DeleteSavedItem($input: DeleteSavedItemInput!) {
		deleteSavedItem(input: $input)
	}
`;

interface CreateMutationData {
	createSavedItem: SavedItem;
}
interface CreateMutationVariables {
	input: {
		audioItemId: string;
	};
}
interface DeleteMutationData {
	deleteSavedItem: boolean;
}
interface DeleteMutationVariables {
	input: {
		audioItemId: string;
	};
}
interface Props {
	audioItem: AudioItem;
}
const SaveItemButton = ({ audioItem }: Props) => {
	const { id, slug, isSavedByUser } = audioItem;
	const router = useRouter();
	const { currentUser, requireLogin } = useRequireLogin();
	const [refetchAudioItem] = useLazyQuery(AUDIO_ITEM_QUERY, {
		fetchPolicy: "network-only",
	});
	const [, { refetch: refetchSavedItemsForUser }] = useSavedItemsForUser();

	const [
		createSavedItem,
		{ loading: createLoading, data: createData, error: createError },
	] = useMutation<CreateMutationData, CreateMutationVariables>(
		CREATE_SAVED_ITEM_MUTATION,
		{ errorPolicy: "all" }
	);
	const [
		deleteSavedItem,
		{ loading: deleteLoading, data: deleteData, error: deleteError },
	] = useMutation<DeleteMutationData, DeleteMutationVariables>(
		DELETE_SAVED_ITEM_MUTATION,
		{ errorPolicy: "all" }
	);

	const onButtonClicked = useCallback(async () => {
		if (!currentUser) {
			const redirectTo = EntityService.makeHrefForView(audioItem);
			return await requireLogin({ redirectTo });
		} else if (!isSavedByUser) {
			createSavedItem({
				variables: {
					input: { audioItemId: id },
				},
			});
		} else if (isSavedByUser) {
			deleteSavedItem({
				variables: {
					input: { audioItemId: id },
				},
			});
		}
	}, [currentUser, router, audioItem, id, createSavedItem, deleteSavedItem]);

	useEffect(() => {
		if (createData) {
			// Now that the Audio Item has been added, refetching the updated
			// Saved Items will also update the Audio Item in cache
			refetchSavedItemsForUser();
		}
	}, [createData, refetchAudioItem, refetchSavedItemsForUser, slug]);
	useEffect(() => {
		if (createError) {
			window.alert("Error saving item. Please try again.");
		}
	}, [createError]);

	useEffect(() => {
		const refetch = async () => {
			await refetchAudioItem({ variables: { slug } });
			refetchSavedItemsForUser();
		};
		if (deleteData) {
			refetch();
		}
	}, [deleteData, refetchAudioItem, refetchSavedItemsForUser, slug]);
	useEffect(() => {
		if (deleteError) {
			window.alert("Error removing saved item. Please try again.");
		}
	}, [deleteError]);

	return (
		<button
			className={`btn-secondary ${
				isSavedByUser ? "btn-secondary-active" : ""
			} pl-0.5`}
			onClick={onButtonClicked}
			disabled={createLoading || deleteLoading}
		>
			{isSavedByUser ? (
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
};

export default SaveItemButton;
