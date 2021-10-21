import Link from "next/link";

import useSavedItemsForUser from "hooks/useSavedItemsForUser";
import useFilters from "hooks/useFilters";
import { FilterType, ViewAs } from "types";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import LoadingBlock from "components/LoadingBlock";
import AudioItem from "components/AudioItem";

const SavedItems = () => {
	const [savedItems, { loading, error }] = useSavedItemsForUser();

	const { Filters, filtersProps, viewAs } = useFilters({
		types: [FilterType.ViewAs],
		defaultViewAs: ViewAs.Compact,
	});

	return (
		<Layout>
			<RequireUser>
				<div className="flex flex-col">
					<h1 className="mb-6">Saved Items</h1>

					{savedItems?.length && <Filters {...filtersProps} className="mb-6" />}

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
					{savedItems?.map(({ audioItem }, index) => (
						<AudioItem
							viewAs={viewAs}
							audioItem={audioItem}
							key={index}
							className="mb-8"
						/>
					))}
				</div>
			</RequireUser>
		</Layout>
	);
};

export default SavedItems;
