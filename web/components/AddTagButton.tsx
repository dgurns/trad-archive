import { useState, useCallback } from "react";
import { useLazyQuery, gql } from "@apollo/client";

import { Entity, Tag } from "types";
import { EntityFragments } from "fragments";
import useRequireLogin from "hooks/useRequireLogin";
import EntityService from "services/Entity";
import { apolloClient } from "apolloClient";

import Modal from "components/Modal";
import LoadingBlock from "components/LoadingBlock";
import CreateTagForm from "components/CreateTagForm";

const PARENT_ENTITY_QUERY = gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Person
			...Instrument
			...Place
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.person}
	${EntityFragments.instrument}
	${EntityFragments.place}
	${EntityFragments.tune}
`;

interface Props {
	entity: Entity;
	onSuccess?: (tag: Tag) => void;
	className?: string;
	children?: React.ReactChild | React.ReactChild[];
}
const AddTagButton = ({ entity, onSuccess, className, children }: Props) => {
	const { currentUser, requireLogin } = useRequireLogin();

	const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);

	const [getParentEntity, { loading: parentEntityLoading }] = useLazyQuery<{
		entity: Entity;
	}>(PARENT_ENTITY_QUERY, {
		variables: { id: entity.id },
		fetchPolicy: "network-only",
	});

	const onCreateTagSuccess = useCallback(
		async (tag: Tag) => {
			// Refetch parent entity so it is updated with the new Tag
			getParentEntity();
			setAddTagModalIsVisible(false);
			if (onSuccess) {
				onSuccess(tag);
			}
		},
		[getParentEntity, setAddTagModalIsVisible, onSuccess, entity]
	);

	const onAddTagClicked = useCallback(async () => {
		if (!currentUser) {
			const redirectTo = EntityService.makeHrefForView(entity);
			return await requireLogin({ redirectTo });
		}
		setAddTagModalIsVisible(true);
	}, [currentUser, requireLogin, entity]);

	return (
		<>
			<button
				className={`btn-text whitespace-pre ${className ?? ""}`}
				onClick={onAddTagClicked}
			>
				{children ?? "+ Add Tag"}
			</button>

			<Modal
				title="Add Tag"
				isVisible={addTagModalIsVisible}
				onClose={() => setAddTagModalIsVisible(false)}
			>
				{parentEntityLoading ? (
					<LoadingBlock />
				) : (
					<CreateTagForm entity={entity} onSuccess={onCreateTagSuccess} />
				)}
			</Modal>
		</>
	);
};

export default AddTagButton;
