import { useEffect, useCallback, useState } from "react";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { type DataFunctionArgs } from "@remix-run/node";

import type {
	CollectionWithRelations,
	CommentWithRelations,
	AudioItemWithRelations,
} from "~/types";
import { ViewAs } from "~/types";
import useFilters from "~/hooks/useFilters";
import EntityService from "~/services/Entity";
import LocalStorageService from "~/services/LocalStorage";
import { db } from "~/utils/db.server";

import Layout from "~/components/Layout";
import ProjectIntro from "~/components/ProjectIntro";
import AudioItemComponent from "~/components/AudioItem";

interface LoaderData {
	audioItems: AudioItemWithRelations[];
	collections: CollectionWithRelations[];
	comments: CommentWithRelations[];
	numAudioItemsAllTime: number;
	numTagsAllTime: number;
	numCommentsAllTime: number;
}

export async function loader({
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get("page") ?? 1);
	const perPage = Number(searchParams.get("perPage") ?? 20);
	const [
		audioItems,
		collections,
		comments,
		numAudioItemsAllTime,
		numTagsAllTime,
		numCommentsAllTime,
	] = await Promise.all([
		db.audioItem.findMany({
			skip: (page - 1) * perPage,
			take: perPage,
			include: {
				tagsAsSubject: {
					include: {
						objectAudioItem: true,
						objectCollection: true,
						objectInstrument: true,
						objectPerson: true,
						objectPlace: true,
						objectTune: true,
						relationship: true,
					},
				},
				createdByUser: true,
				updatedByUser: true,
				comments: {
					include: {
						createdByUser: true,
					},
					orderBy: {
						createdAt: "asc",
					},
				},
			},
			orderBy: {
				updatedAt: "desc",
			},
		}),
		db.collection.findMany({
			take: 5,
			include: {
				tagsAsSubject: true,
				createdByUser: true,
				updatedByUser: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		}),
		db.comment.findMany({
			take: 6,
			include: {
				createdByUser: true,
				parentAudioItem: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		}),
		db.audioItem.count(),
		db.tag.count(),
		db.comment.count(),
	]);
	return {
		audioItems,
		collections,
		comments,
		numAudioItemsAllTime,
		numTagsAllTime,
		numCommentsAllTime,
	};
}

export default function Home() {
	const {
		audioItems,
		collections,
		comments,
		numAudioItemsAllTime,
		numTagsAllTime,
		numCommentsAllTime,
	} = useLoaderData<LoaderData>();
	const { search } = useLocation();
	const viewAs =
		(new URLSearchParams(search).get("viewAs") as ViewAs) ?? ViewAs.Cards;

	const { Filters, filtersProps } = useFilters({
		totalItems: numAudioItemsAllTime,
	});

	// Due to static rendering, we need to check localStorage for intro status
	// after client-side hydration.
	const [shouldShowIntro, setShouldShowIntro] = useState(false);
	useEffect(() => {
		if (LocalStorageService.getItem("SHOULD_SHOW_INTRO") !== "false") {
			setShouldShowIntro(true);
		}
	}, []);
	const onCloseIntro = useCallback(() => {
		LocalStorageService.setItem("SHOULD_SHOW_INTRO", "false");
		setShouldShowIntro(false);
	}, []);

	return (
		<Layout>
			{shouldShowIntro && (
				<ProjectIntro
					className="mb-8 md:mt-4 md:mb-12"
					onClose={onCloseIntro}
				/>
			)}

			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
					<h1>Explore</h1>

					<Filters
						{...filtersProps}
						viewAs={undefined}
						sortBy={undefined}
						className="sticky left-0 right-0 py-4 px-4 -ml-4 -mr-4 bg-gray-100 top-[48px] mb-2 z-10"
					/>

					{audioItems.map((audioItem, index) => (
						<AudioItemComponent
							viewAs={viewAs}
							audioItem={audioItem}
							key={index}
							className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
						/>
					))}
				</div>

				<div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">Browse</h3>
					<Link to="/entities/people" className="mb-2">
						People
					</Link>
					<Link to="/entities/instruments" className="mb-2">
						Instruments
					</Link>
					<Link to="/entities/places" className="mb-2">
						Places
					</Link>
					<Link to="/entities/tunes" className="mb-2">
						Tunes
					</Link>
					<Link to="/entities/collections" className="mb-2">
						Collections
					</Link>

					<h3 className="mt-6 mb-4">Stats</h3>
					<span className="mb-2 text-gray-500">
						{numAudioItemsAllTime} Audio Items
					</span>
					<span className="mb-2 text-gray-500">{numTagsAllTime} Tags</span>
					<span className="mb-2 text-gray-500">
						{numCommentsAllTime} Comments
					</span>

					<h3 className="mt-6 mb-4">Latest Collections</h3>
					{collections.map((collection, index) => {
						const { name } = collection;
						if (!name) {
							return null;
						}
						return (
							<div className="mb-2 text-gray-500" key={index}>
								<Link to={EntityService.makeHrefForView(collection)}>
									{collection.name}
								</Link>
							</div>
						);
					})}

					<h3 className="mt-6 mb-4">Latest Features + Fixes</h3>
					<a
						className="mb-2"
						href="https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc"
						target="_blank"
						rel="noreferrer"
					>
						View on GitHub{" "}
						<i className="material-icons">
							<span className="text-sm">launch</span>
						</i>
					</a>

					<h3 className="mt-6 mb-4">Latest Comments</h3>
					{comments.map((comment, index) => {
						const { createdByUser, parentAudioItem, text } = comment;
						if (!createdByUser || !parentAudioItem) {
							return null;
						}
						return (
							<div className="mb-4 text-gray-500" key={index}>
								<div className=" mb-1">
									<Link to={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` commented on `}
									<Link to={EntityService.makeHrefForView(parentAudioItem)}>
										{parentAudioItem.name}
									</Link>
									{":"}
								</div>
								<div className="whitespace-pre-line text-sm">{text}</div>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}