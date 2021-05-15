import { useEffect, useState, useCallback } from "react";
import { useMutation, gql } from "@apollo/client";

import { Entity, EntityType, Tag } from "types";
import usePlayerContext from "hooks/usePlayerContext";

import SearchEntities from "components/SearchEntities";
import SelectRelationship from "components/SelectRelationship";

const CREATE_TAG_MUTATION = gql`
	mutation CreateTag($input: CreateTagInput!) {
		createTag(input: $input) {
			id
		}
	}
`;
interface CreateTagInput {
	relationshipId: string;
	subjectEntityType: EntityType;
	subjectEntityId: string;
	objectEntityType: EntityType;
	objectEntityId: string;
	subjectTimeMarkerSeconds?: number;
}
interface Props {
	entity: Entity;
	onSuccess: (tag: Tag) => void;
}
const CreateTagForm = ({ entity, onSuccess }: Props) => {
	const {
		activeAudioItem,
		playbackPositionSeconds,
		activeItemDurationSeconds,
	} = usePlayerContext();

	const isActiveAudioItem = activeAudioItem?.id === entity.id;
	const defaultTimeMarkerValue = isActiveAudioItem
		? playbackPositionSeconds
		: undefined;

	const [shouldAddTimeMarker, setShouldAddTimeMarker] = useState(false);
	const [timeMarkerValue, setTimeMarkerValue] = useState<number | undefined>(
		defaultTimeMarkerValue
	);

	const [selectedEntity, setSelectedEntity] = useState<Entity>(null);
	const [selectedRelationshipId, setSelectedRelationshipId] = useState("");
	const [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] =
		useState(true);
	const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] =
		useState("");

	const [createTag, { loading, data, error }] = useMutation<
		{ createTag: Tag },
		{ input: CreateTagInput }
	>(CREATE_TAG_MUTATION, {
		errorPolicy: "all",
	});

	useEffect(() => {
		if (data?.createTag) {
			onSuccess(data.createTag);
		}
	}, [data]);

	const onSelectEntity = useCallback(
		(selectedEntityFromResults: Entity) => {
			if (selectedEntityFromResults.id === entity.id) {
				return window.alert("Cannot tag an entity with itself");
			}
			setSelectedEntity(selectedEntityFromResults);
		},
		[entity]
	);

	const onNewEntityCreated = useCallback((entity: Entity) => {
		setSelectedEntity(entity);
	}, []);

	const onTimeMarkerValueChanged = useCallback(
		(event) => {
			const newTimeMarkerValue = parseInt(event.target.value);
			if (isNaN(newTimeMarkerValue)) {
				setShouldAddTimeMarker(false);
				setTimeMarkerValue(NaN);
				return;
			} else if (newTimeMarkerValue > activeItemDurationSeconds) {
				setTimeMarkerValue(activeItemDurationSeconds);
				return;
			} else {
				setShouldAddTimeMarker(true);
				setTimeMarkerValue(newTimeMarkerValue);
				return;
			}
		},
		[playbackPositionSeconds, activeItemDurationSeconds]
	);

	const onSelectRelationship = useCallback(
		(relationshipId: string) => {
			setSelectedRelationshipId(relationshipId);
		},
		[setSelectedRelationshipId]
	);

	const onSelectInverseRelationship = useCallback(
		(relationshipId: string) => {
			setSelectedInverseRelationshipId(relationshipId);
		},
		[setSelectedInverseRelationshipId]
	);

	const onCreateTagClicked = useCallback(async () => {
		let subjectTimeMarkerSeconds: number | undefined;
		if (shouldAddTimeMarker && !isNaN(timeMarkerValue)) {
			subjectTimeMarkerSeconds = timeMarkerValue;
		}
		const tagInput = {
			relationshipId: selectedRelationshipId,
			subjectEntityType: entity.entityType,
			subjectEntityId: entity.id,
			objectEntityType: selectedEntity.entityType,
			objectEntityId: selectedEntity.id,
			subjectTimeMarkerSeconds,
		};
		await createTag({ variables: { input: tagInput } });

		if (shouldCreateInverseRelationship && selectedInverseRelationshipId) {
			const inverseTagInput = {
				relationshipId: selectedInverseRelationshipId,
				subjectEntityType: selectedEntity.entityType,
				subjectEntityId: selectedEntity.id,
				objectEntityType: entity.entityType,
				objectEntityId: entity.id,
				subjectTimeMarkerSeconds,
			};
			await createTag({ variables: { input: inverseTagInput } });
		}
	}, [
		selectedRelationshipId,
		selectedInverseRelationshipId,
		entity,
		selectedEntity,
		createTag,
		shouldAddTimeMarker,
		timeMarkerValue,
	]);

	if (!selectedEntity) {
		return (
			<SearchEntities
				onSelect={onSelectEntity}
				onNewEntityCreated={onNewEntityCreated}
			/>
		);
	}

	// Only show the time marker option if the subject entity is an AudioItem
	const shouldShowTimeMarkerCheckbox =
		entity.entityType === EntityType.AudioItem;

	return (
		<>
			<div>What is the relationship between these two entities?</div>

			<div className="mt-3">
				<SelectRelationship
					subjectEntity={entity}
					objectEntity={selectedEntity}
					onSelect={onSelectRelationship}
				/>
			</div>

			{selectedRelationshipId && (
				<div className="mt-6 flex flex-row items-center justify-start">
					<input
						type="checkbox"
						id="reverse-relationship"
						checked={shouldCreateInverseRelationship}
						onChange={(event) =>
							setShouldCreateInverseRelationship(event.target.checked)
						}
					/>
					<label htmlFor="reverse-relationship" className="ml-2">
						Also create the inverse relationship
					</label>
				</div>
			)}

			{shouldCreateInverseRelationship && (
				<div className="mt-3">
					<SelectRelationship
						subjectEntity={selectedEntity}
						objectEntity={entity}
						onSelect={onSelectInverseRelationship}
					/>
				</div>
			)}

			{shouldShowTimeMarkerCheckbox && (
				<div className="mt-4 flex flex-row items-center justify-start">
					<input
						type="checkbox"
						id="time-marker"
						checked={shouldAddTimeMarker}
						onChange={(event) => setShouldAddTimeMarker(event.target.checked)}
					/>
					<label htmlFor="time-marker" className="ml-2">
						<div className="flex flex-row items-center">
							Mark this tag at time{" "}
							<div className="w-16 mx-2">
								<input
									type="number"
									value={timeMarkerValue}
									onChange={onTimeMarkerValueChanged}
								/>{" "}
							</div>
							second{timeMarkerValue === 1 ? "" : "s"}
						</div>
					</label>
				</div>
			)}

			<button
				className="btn mt-6"
				onClick={onCreateTagClicked}
				disabled={loading || !selectedRelationshipId}
			>
				Save
			</button>
			{error && <div className="text-red-600 mt-4">{error.message}</div>}
		</>
	);
};

export default CreateTagForm;
