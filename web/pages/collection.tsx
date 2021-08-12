import { useRouter } from "next/router";
import Link from "next/link";

import useCollectionEntriesForUser from "hooks/useCollectionEntriesForUser";
import usePlayerContext from "hooks/usePlayerContext";
import { Tag } from "types";
import EntityService from "services/Entity";
import TagService from "services/Tag";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import LoadingBlock from "components/LoadingBlock";

interface TagLinkProps {
	tag: Tag;
}
const TagLink = ({ tag }: TagLinkProps) => {
	const { objectEntity } = tag;
	const href = EntityService.makeHrefForView(objectEntity);

	return <Link href={href}>{objectEntity.name}</Link>;
};

const Collection = () => {
	const [collectionEntries, { loading, error }] = useCollectionEntriesForUser();
	const { activeAudioItem, setActiveAudioItem } = usePlayerContext();

	return (
		<Layout>
			<RequireUser>
				<div className="flex flex-col">
					<h1 className="mb-4">Your Collection</h1>
					{error && (
						<div className="text-red-600 mb-4">Could not fetch Collection</div>
					)}
					{loading && !collectionEntries && (
						<div className="mb-4">
							<LoadingBlock />
						</div>
					)}
					{collectionEntries?.length === 0 && (
						<div className="text-gray-500">
							Nothing in your collection yet - try adding some{" "}
							<Link href="/">Audio Items</Link>!
						</div>
					)}
					{collectionEntries?.map(({ audioItem }, index) => {
						const audioItemIsInPlayer = activeAudioItem?.id === audioItem.id;
						const sortedTags = TagService.sort(audioItem.tags);

						return (
							<div className="mb-4 text-gray-500" key={index}>
								<Link href={`/entities/audio-items/${audioItem.slug}`}>
									{audioItem.name}
								</Link>
								<div>
									Tags:{" "}
									{sortedTags.length === 0 && (
										<span className="text-gray-500">None</span>
									)}
									{sortedTags.map((tag, index) => (
										<span key={index}>
											<TagLink tag={tag} />
											{index !== sortedTags.length - 1 && ", "}
										</span>
									))}
								</div>
								{audioItemIsInPlayer ? (
									"Playing"
								) : (
									<button
										className="btn-text flex flex-row items-center"
										onClick={() => setActiveAudioItem(audioItem)}
									>
										<i className="material-icons mb-0.5">play_arrow</i>
										Play
									</button>
								)}
							</div>
						);
					})}
				</div>
			</RequireUser>
		</Layout>
	);
};

export default Collection;
