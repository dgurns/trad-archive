import { useRouter } from "next/router";
import Link from "next/link";

import useSavedItemsForUser from "hooks/useSavedItemsForUser";
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

const SavedItems = () => {
	const [savedItems, { loading, error }] = useSavedItemsForUser();
	const { activeAudioItem, setActiveAudioItem } = usePlayerContext();

	return (
		<Layout>
			<RequireUser>
				<div className="flex flex-col">
					<h1 className="mb-4">Saved</h1>
					{error && (
						<div className="text-red-600 mb-4">Could not fetch saved items</div>
					)}
					{loading && !savedItems && (
						<div className="mb-4">
							<LoadingBlock />
						</div>
					)}
					{savedItems?.length === 0 && (
						<div className="text-gray-500">
							Nothing saved yet - try browsing some{" "}
							<Link href="/">Audio Items</Link>!
						</div>
					)}
					{savedItems?.map(({ audioItem }, index) => {
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

export default SavedItems;
