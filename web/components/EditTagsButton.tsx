import { useState, useCallback, useEffect, useMemo } from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";

import { Entity } from "types";
import { EntityFragments } from "fragments";
import useRequireLogin from "hooks/useRequireLogin";
import useTags from "hooks/useTags";
import DateTimeService from "services/DateTime";
import TagService from "services/Tag";

import Modal from "components/Modal";
import LoadingBlock from "components/LoadingBlock";

const PARENT_ENTITY_QUERY = gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Collection
			...Person
			...Place
			...Instrument
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.collection}
	${EntityFragments.instrument}
	${EntityFragments.person}
	${EntityFragments.place}
	${EntityFragments.tune}
`;

const DELETE_TAG_MUTATION = gql`
	mutation DeleteTag($id: String!) {
		deleteTag(id: $id)
	}
`;

interface Props {
	entity: Entity;
	className?: string;
	children?: React.ReactChild | React.ReactChild[];
}
const EditTagsButton = ({ entity, className, children }: Props) => {
	const { currentUser, requireLogin } = useRequireLogin();

	const [editTagsModalIsVisible, setEditTagsModalIsVisible] = useState(false);

	const [getParentEntity, { loading: parentEntityLoading }] = useLazyQuery<{
		entity: Entity;
	}>(PARENT_ENTITY_QUERY, {
		variables: { id: entity.id },
		fetchPolicy: "network-only",
	});

	const [deleteTag, { loading: deleteTagLoading, data: deleteTagData }] =
		useMutation(DELETE_TAG_MUTATION, { errorPolicy: "all" });

	const {
		tagsQuery: { refetch: refetchTopLevelTags },
	} = useTags();

	const onDeleteTag = useCallback(
		async (id: string) => {
			if (!currentUser) {
				return await requireLogin();
			}
			if (window.confirm("Are you sure you want to delete this Tag?")) {
				deleteTag({ variables: { id } });
			}
		},
		[deleteTag, currentUser, requireLogin]
	);

	useEffect(() => {
		const onDeleteSuccess = async () => {
			await Promise.all([refetchTopLevelTags(), getParentEntity()]);
			setEditTagsModalIsVisible(false);
		};
		if (deleteTagData?.deleteTag) {
			onDeleteSuccess();
		}
	}, [
		deleteTagData,
		getParentEntity,
		setEditTagsModalIsVisible,
		refetchTopLevelTags,
	]);

	const { tags } = entity;

	const sortedTags = useMemo(() => {
		if (!Array.isArray(tags)) {
			return [];
		}
		return TagService.sort(tags);
	}, [tags]);

	if (!sortedTags || sortedTags.length === 0) {
		return null;
	}

	const isLoading = parentEntityLoading || deleteTagLoading;

	return (
		<>
			<button
				className={`btn-text whitespace-pre ${className ?? ""}`}
				onClick={() => setEditTagsModalIsVisible(true)}
			>
				{children ?? "Edit Tags"}
			</button>

			<Modal
				title="Edit Tags"
				isVisible={editTagsModalIsVisible}
				onClose={() => setEditTagsModalIsVisible(false)}
			>
				{isLoading ? (
					<LoadingBlock />
				) : (
					sortedTags.map((tag, index) => {
						const { id, relationship, objectEntity, subjectTimeMarkerSeconds } =
							tag;
						return (
							<div
								className="flex flex-row items-start justify-start"
								key={index}
							>
								<div className="flex flex-col flex-1 justify-start align-start mb-4 pr-4">
									<div className="italic text-gray-500">
										{relationship.name}
									</div>
									<div className="uppercase text-sm text-gray-500 pr-2">
										{objectEntity.entityType}
									</div>
									{objectEntity.name}
									{typeof subjectTimeMarkerSeconds === "number" && (
										<span className="italic text-gray-500">
											{`at ${DateTimeService.formatSecondsAsDuration(
												subjectTimeMarkerSeconds
											)}`}
										</span>
									)}
								</div>
								<button className="btn-text" onClick={() => onDeleteTag(id)}>
									Delete Tag
								</button>
							</div>
						);
					})
				)}
			</Modal>
		</>
	);
};

export default EditTagsButton;
