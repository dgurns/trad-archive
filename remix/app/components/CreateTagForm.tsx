import { useEffect, useState, useCallback } from "react";
import { type Tag, EntityType } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import type { Entity } from "~/types";
import usePlayerContext from "~/hooks/usePlayerContext";

import SearchEntities from "~/components/SearchEntities";
import SelectRelationship from "~/components/SelectRelationship";
import TimestampInput from "~/components/TimestampInput";

interface Props {
	entity: Entity;
	onSuccess: (tag: Tag) => void;
}
const CreateTagForm = ({ entity, onSuccess }: Props) => {
	const fetcher = useFetcher<{
		error?: string;
		tag?: Tag;
		tagInverse?: Tag;
	}>();

	// Call onSuccess once the tag has been created and data revalidated
	const createdTag = fetcher.data?.tag;
	const isSubmittingOrLoading =
		fetcher.state === "submitting" || fetcher.state === "loading";
	useEffect(() => {
		if (createdTag && !isSubmittingOrLoading) {
			onSuccess(createdTag);
		}
	}, [createdTag, onSuccess, isSubmittingOrLoading]);

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
	const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] =
		useState("");

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

	const onCreateTagClicked = async () => {
		if (!selectedEntity?.entityType || !entity.entityType) {
			return;
		}
		let subjectTimeMarkerSeconds: number | undefined;
		if (shouldAddTimeMarker && typeof timeMarkerValue === "number") {
			subjectTimeMarkerSeconds = timeMarkerValue;
		}
		await fetcher.submit(
			{
				relationshipId: selectedRelationshipId,
				inverseRelationshipId: selectedInverseRelationshipId,
				subjectEntityType: entity.entityType,
				subjectEntityId: entity.id,
				objectEntityType: selectedEntity.entityType,
				objectEntityId: selectedEntity.id,
				subjectTimeMarkerSeconds: String(subjectTimeMarkerSeconds ?? ""),
			},
			{ method: "post", action: "/tags" }
		);
	};

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

			<div className="mt-2 pl-4">
				<SelectRelationship
					subjectEntity={entity}
					objectEntity={selectedEntity}
					onSelect={onSelectRelationship}
				/>
			</div>

			<div className="mt-6">...and what is the inverse relationship?</div>

			<div className="mt-2 pl-4">
				<SelectRelationship
					subjectEntity={selectedEntity}
					objectEntity={entity}
					onSelect={onSelectInverseRelationship}
				/>
			</div>

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
				disabled={!selectedRelationshipId || fetcher.state !== "idle"}
			>
				Save
			</button>

			{fetcher.data?.error && (
				<div className="text-red-600 mt-4">{fetcher.data.error}</div>
			)}
		</>
	);
};

export default CreateTagForm;
