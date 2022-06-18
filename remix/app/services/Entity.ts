import type { Entity } from "~/types";
import { EntityType } from "~/types";

const cleanSlug = (rawSlug: string) => {
	const slugWithHyphens = rawSlug.replace(/[\s]/g, "-");
	return slugWithHyphens.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
};

const makeHrefForTopLevel = (entity?: Entity | null) => {
	switch (entity?.entityType) {
		case EntityType.AudioItem:
			return "/entities/audio-items";
		case EntityType.Person:
			return "/entities/people";
		case EntityType.Instrument:
			return "/entities/instruments";
		case EntityType.Place:
			return "/entities/places";
		case EntityType.Tune:
			return "/entities/tunes";
		case EntityType.Collection:
			return "/entities/collections";
		default:
			return "";
	}
};

const makeHrefForView = (entity?: Entity | null) => {
	if (!entity) {
		return "";
	}
	return `${makeHrefForTopLevel(entity)}/${entity.slug}`;
};

const makeHrefForEdit = (entity?: Entity | null) => {
	if (!entity) {
		return "";
	}
	return `${makeHrefForView(entity)}/edit`;
};

const makeHrefForAbout = (entity?: Entity | null) => {
	if (!entity) {
		return "";
	}
	return `${makeHrefForView(entity)}/about`;
};

const makeHrefForTags = (entity?: Entity | null) => {
	if (!entity) {
		return "";
	}
	return `${makeHrefForView(entity)}/tags`;
};

const makeReadableNamePlural = (entity?: Entity | null) => {
	switch (entity?.entityType) {
		case EntityType.AudioItem:
			return "Audio Items";
		case EntityType.Person:
			return "People";
		case EntityType.Instrument:
			return "Instruments";
		case EntityType.Place:
			return "Places";
		case EntityType.Tune:
			return "Tunes";
		case EntityType.Collection:
			return "Collections";
		default:
			return "";
	}
};

const EntityService = {
	cleanSlug,
	makeHrefForTopLevel,
	makeHrefForView,
	makeHrefForEdit,
	makeHrefForAbout,
	makeHrefForTags,
	makeReadableNamePlural,
};
export default EntityService;
