import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { ViewAs, type AudioItemWithTags } from "~/types";
import AudioItemComponent from "~/components/AudioItem";

interface LoaderData {
	audioItems: AudioItemWithTags[];
}

export async function loader(): Promise<LoaderData> {
	const audioItems = await db.audioItem.findMany({
		include: {
			tagsAsSubject: true,
			createdByUser: true,
		},
	});
	return { audioItems };
}

export default function Index() {
	const { audioItems } = useLoaderData<LoaderData>();

	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex flex-1 flex-col pb-8">
				<h1 className="mb-6">Explore</h1>

				{audioItems.map((audioItem, index) => (
					<AudioItemComponent
						viewAs={ViewAs.Cards}
						audioItem={audioItem}
						key={index}
						className="mb-6"
					/>
				))}
			</div>

			<div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
				<h3 className="mb-4">Browse</h3>
				<div className="flex flex-col space-y-2">
					<Link to="/entities/people">People</Link>
					<Link to="/entities/instruments">Instruments</Link>
					<Link to="/entities/places">Places</Link>
					<Link to="/entities/tunes">Tunes</Link>
					<Link to="/entities/collections">Collections</Link>
				</div>

				{/* {prefetchedStats && (
					<>
						<h3 className="mt-6 mb-4">Stats</h3>
						<span className="mb-2 text-gray-500">
							{prefetchedStats.numAudioItemsAllTime} Audio Items
						</span>
						<span className="mb-2 text-gray-500">
							{prefetchedStats.numTagsAllTime} Tags
						</span>
						<span className="mb-2 text-gray-500">
							{prefetchedStats.numCommentsAllTime} Comments
						</span>
					</>
				)} */}

				<h3 className="mt-6 mb-4">Latest Collections</h3>
				{/* {collections.map((collection, index) => {
					const { name } = collection;
					if (!name) {
						return null;
					}
					return (
						<div className="mb-2 text-gray-500" key={index}>
							<Link href={EntityService.makeHrefForView(collection)}>
								{collection.name}
							</Link>
						</div>
					);
				})} */}

				<h3 className="mt-6 mb-4">Latest Features + Fixes</h3>
				<a
					className="mb-2"
					href="https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc"
					target="_blank"
					rel="noreferrer"
				>
					View on GitHub <i className="material-icons text-sm">launch</i>
				</a>

				<h3 className="mt-6 mb-4">Latest Comments</h3>
				{/* {comments.map((comment, index) => {
					const { createdByUser, parentAudioItem, text } = comment;
					if (!createdByUser) {
						return null;
					}
					return (
						<div className="mb-4 text-gray-500" key={index}>
							<div className=" mb-1">
								<Link href={`/users/${createdByUser.id}`}>
									{createdByUser.username}
								</Link>
								{` commented on `}
								<Link href={EntityService.makeHrefForView(parentAudioItem)}>
									{parentAudioItem.name}
								</Link>
								{":"}
							</div>
							<div className="whitespace-pre-line text-sm">{text}</div>
						</div>
					);
				})} */}
			</div>
		</div>
	);
}
