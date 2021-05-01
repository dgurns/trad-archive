import { Entity, EntityType } from "types";

const makeHrefForView = (entity: Entity) => {
	switch (entity.entityType) {
		case EntityType.AudioItem:
			return `/entities/audio-items/${entity.slug}`;
		case EntityType.Person:
			return `/entities/people/${entity.slug}`;
		case EntityType.Instrument:
			return `/entities/instruments/${entity.slug}`;
		case EntityType.Place:
			return `/entities/places/${entity.slug}`;
		case EntityType.Tune:
			return `/entities/tunes/${entity.slug}`;
		default:
			return "";
	}
};

const makeHrefForEdit = (entity: Entity) => {
	return `${makeHrefForView(entity)}/edit`;
};

const EntityService = {
	makeHrefForView,
	makeHrefForEdit,
};
export default EntityService;
