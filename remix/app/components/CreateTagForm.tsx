import { useEffect, useState, useCallback } from "react";
import { type Tag } from "@prisma/client";

import type { Entity } from "~/types";
import { EntityType } from "~/types";
import usePlayerContext from "~/hooks/usePlayerContext";

import SearchEntities from "~/components/SearchEntities";
import SelectRelationship from "~/components/SelectRelationship";
import TimestampInput from "~/components/TimestampInput";

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

	const [selectedEntity, setSelectedEntity] = useState<Entity>();
	const [selectedRelationshipId, setSelectedRelationshipId] = useState("");
	const [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] =
		useState(true);
	const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] =
		useState("");

	const [primaryCreatedTag, setPrimaryCreatedTag] = useState<Tag | undefined>(
		undefined
	);
	const [tagsAreCreated, setTagsAreCreated] = useState(false);

	useEffect(() => {
		if (!tagsAreCreated) {
			return;
		}
		const onCreateSuccess = async (tag: Tag) => {
			await onSuccess(tag);
		};
		if (primaryCreatedTag) {
			onCreateSuccess(primaryCreatedTag);
		}
	}, [onSuccess, tagsAreCreated, primaryCreatedTag]);

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
		(newTimeMarkerValueSeconds: number) => {
			setShouldAddTimeMarker(true);
			if (
				typeof activeItemDurationSeconds !== "undefined" &&
				newTimeMarkerValueSeconds >= activeItemDurationSeconds
			) {
				setTimeMarkerValue(activeItemDurationSeconds);
			} else if (newTimeMarkerValueSeconds <= 0) {
				setTimeMarkerValue(0);
			} else {
				setTimeMarkerValue(newTimeMarkerValueSeconds);
			}
		},
		[activeItemDurationSeconds]
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
		if (!selectedEntity) {
			return;
		}
		let subjectTimeMarkerSeconds: number | undefined;
		if (shouldAddTimeMarker && typeof timeMarkerValue === "number") {
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
		// TODO: create primary tag
		// setPrimaryCreatedTag(primaryTagQuery.data?.createTag);

		if (shouldCreateInverseRelationship && selectedInverseRelationshipId) {
			const inverseTagInput = {
				relationshipId: selectedInverseRelationshipId,
				subjectEntityType: selectedEntity.entityType,
				subjectEntityId: selectedEntity.id,
				objectEntityType: entity.entityType,
				objectEntityId: entity.id,
				subjectTimeMarkerSeconds,
			};
			// TODO: create inverse tag
		}

		setTagsAreCreated(true);
	}, [
		selectedRelationshipId,
		shouldCreateInverseRelationship,
		selectedInverseRelationshipId,
		entity,
		selectedEntity,
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
		entity.entityType === EntityType.AudioItem &&
		typeof defaultTimeMarkerValue !== "undefined";

	return (
		<>
			<div>What is the relationship between these two entities?</div>

			<div className="mt-2">
				<SelectRelationship
					subjectEntity={entity}
					objectEntity={selectedEntity}
					onSelect={onSelectRelationship}
				/>
			</div>

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

			{shouldCreateInverseRelationship && (
				<div className="mt-2">
					<SelectRelationship
						subjectEntity={selectedEntity}
						objectEntity={entity}
						onSelect={onSelectInverseRelationship}
					/>
				</div>
			)}

			{shouldShowTimeMarkerCheckbox && (
				<div className="mt-6 flex flex-row items-start justify-start">
					<input
						type="checkbox"
						id="time-marker"
						className="mt-1"
						checked={shouldAddTimeMarker}
						onChange={(event) => setShouldAddTimeMarker(event.target.checked)}
					/>
					<label htmlFor="time-marker" className="ml-2">
						<div className="flex flex-col items-start">
							<div className="mb-2">Mark this Tag at time:</div>
							<TimestampInput
								valueInSeconds={timeMarkerValue ?? 0}
								onChange={onTimeMarkerValueChanged}
							/>
						</div>
					</label>
				</div>
			)}

			<button
				className="btn mt-6"
				onClick={onCreateTagClicked}
				disabled={!selectedRelationshipId}
			>
				Save
			</button>
			{error && <div className="text-red-600 mt-4">{error.message}</div>}
		</>
	);
};

export default CreateTagForm;
