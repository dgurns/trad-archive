import { registerEnumType } from "type-graphql";

export enum SortBy {
	RecentlyTagged = "RECENTLY_TAGGED",
	RecentlyAdded = "RECENTLY_ADDED",
}
registerEnumType(SortBy, {
	name: "SortBy",
});
