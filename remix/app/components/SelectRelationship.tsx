import { useEffect, useState } from "react";

import type { Entity } from "~/types";

interface Props {
	subjectEntity: Entity;
	objectEntity: Entity;
	onSelect: (relationshipId: string) => void;
}
const SelectRelationship = ({
	subjectEntity,
	objectEntity,
	onSelect,
}: Props) => {
	const [selectedRelationshipId, setSelectedRelationshipId] = useState("");

	const relationshipOptions = data?.searchRelationships ?? [];

	useEffect(() => {
		if (relationshipOptions.length > 0) {
			onSelectRelationshipId(relationshipOptions[0].id);
		}
	}, [relationshipOptions]);

	const onSelectRelationshipId = (relationshipId: string) => {
		setSelectedRelationshipId(relationshipId);
		onSelect(relationshipId);
	};

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
				onChange={(event) => onSelectRelationshipId(event.target.value)}
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

			{error && <div className="text-red-600 mt-4">{error}</div>}
		</>
	);
};

export default SelectRelationship;
