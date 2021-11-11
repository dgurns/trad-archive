import { registerEnumType } from "type-graphql";

export enum SortBy {
	RecentlyTagged = "RECENTLY_TAGGED",
	RecentlyAdded = "RECENTLY_ADDED",
	AToZ = "A_TO_Z",
}
registerEnumType(SortBy, {
	name: "SortBy",
});
