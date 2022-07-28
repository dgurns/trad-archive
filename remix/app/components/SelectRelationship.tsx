import { useEffect, useState, useCallback, useMemo } from "react";
import { type Relationship } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import type { Entity } from "~/types";

interface Props {
	subjectEntity: Entity;
	objectEntity: Entity;
	onSelect: (relationshipId: string) => void;
}
export default function SelectRelationship({
	subjectEntity,
	objectEntity,
	onSelect,
}: Props) {
	const fetcher = useFetcher<{
		error?: string;
		relationships?: Relationship[];
	}>();
	useEffect(() => {
		const params = new URLSearchParams({
			subjectEntityType: String(subjectEntity.entityType),
			objectEntityType: String(objectEntity.entityType),
		});
		fetcher.load(`/relationships?${params.toString()}`);
	}, [subjectEntity, objectEntity]); // fetcher object changes on every render, so intentionally leave it out

	const relationshipOptions = useMemo(
		() => fetcher.data?.relationships ?? [],
		[fetcher.data]
	);

	const [selectedRelationshipId, setSelectedRelationshipId] = useState("");
	useEffect(() => {
		if (relationshipOptions.length > 0) {
			setSelectedRelationshipId(relationshipOptions[0].id);
		}
	}, [relationshipOptions]);

	useEffect(() => {
		if (onSelect && selectedRelationshipId) {
			onSelect(selectedRelationshipId);
		}
	}, [onSelect, selectedRelationshipId]);

	return (
		<>
			<div className="mb-2 text-gray-500">
				<span className="text-sm uppercase pr-2">
					{subjectEntity.entityType}
				</span>
				{subjectEntity.name}
			</div>

			<select
				className="mb-2"
				value={selectedRelationshipId}
				onChange={(event) => setSelectedRelationshipId(event.target.value)}
			>
				{relationshipOptions.map((relationship, index) => (
					<option value={relationship.id} key={index}>
						{relationship.name}
					</option>
				))}
			</select>

			<div className="text-gray-500">
				<span className="text-sm uppercase pr-2">
					{objectEntity.entityType}
				</span>
				{objectEntity.name}
			</div>

			{fetcher.data?.error && (
				<div className="text-red-600 mt-4">{fetcher.data.error}</div>
			)}
		</>
	);
}
