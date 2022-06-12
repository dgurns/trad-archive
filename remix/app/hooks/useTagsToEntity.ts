import { useEffect } from "react";
import { useLazyQuery, gql, LazyQueryResult } from "@apollo/client";
import { Tag, Entity, EntityType, AudioItem } from "types";
import { TagFragments } from "~/fragments";

export const TAGS_TO_ENTITY_QUERY = gql`
	query TagsToEntity($input: TagsToEntityInput!) {
		tagsToEntity(input: $input) {
			...Tag
		}
	}
	${TagFragments.tag}
`;

interface QueryData {
	tagsToEntity?: Tag[];
}
interface QueryVariables {
	input: {
		entityType: EntityType;
		entityId: string;
	};
}

const useTagsToEntity = (
	entity?: Entity
): [Tag[] | undefined, LazyQueryResult<QueryData, QueryVariables>] => {
	const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
		TAGS_TO_ENTITY_QUERY,
		{
			variables: {
				input: {
					entityType: entity?.entityType,
					entityId: entity?.id,
				},
			},
		}
	);

	useEffect(() => {
		if (entity) {
			makeQuery();
		}
	}, [makeQuery, entity]);

	const tags = query.data?.tagsToEntity;

	return [tags, query];
};

export default useTagsToEntity;
