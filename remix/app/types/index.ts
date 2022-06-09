import { Prisma } from "@prisma/client";

export enum PerPage {
	Ten = 10,
	Twenty = 20,
	Fifty = 50,
	Hundred = 100,
}

export enum SortBy {
	RecentlyTagged = "RecentlyTagged",
	RecentlyAdded = "RecentlyAdded",
	AToZ = "AToZ",
}

export enum ViewAs {
	Cards = "Cards",
	Compact = "Compact",
	List = "List",
}

const audioItemWithTags = Prisma.validator<Prisma.AudioItemArgs>()({
	include: { tagsAsSubject: true, createdByUser: true },
});
export type AudioItemWithTags = Prisma.AudioItemGetPayload<
	typeof audioItemWithTags
>;
