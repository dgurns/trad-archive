import Link from "next/link";

import useSavedItemsForUser from "hooks/useSavedItemsForUser";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import LoadingBlock from "components/LoadingBlock";
import AudioItemCondensed from "components/AudioItemCondensed";

const SavedItems = () => {
	const [savedItems, { loading, error }] = useSavedItemsForUser();

	return (
		<Layout>
			<RequireUser>
				<div className="flex flex-col">
					<h1 className="mb-6">Saved Items</h1>

					{error && (
						<div className="text-red-600 mb-4">Could not fetch saved items</div>
					)}
					{loading && !savedItems && (
						<div className="mb-4">
							<LoadingBlock />
						</div>
					)}
					{!loading && savedItems?.length === 0 && (
						<div className="text-gray-500">
							Nothing saved yet - try browsing some{" "}
							<Link href="/">Audio Items</Link>!
						</div>
					)}
					{savedItems?.map(({ audioItem }, index) => {
						return (
							<AudioItemCondensed
								audioItem={audioItem}
								className="mb-4"
								key={index}
							/>
						);
					})}
				</div>
			</RequireUser>
		</Layout>
	);
};

export default SavedItems;
