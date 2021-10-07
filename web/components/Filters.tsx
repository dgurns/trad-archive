import React from "react";
import { SortBy, ViewAs } from "types";

interface Props {
	className?: string;
	sortByValue?: SortBy;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAsValue?: ViewAs;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters = ({
	className,
	sortByValue = SortBy.RecentlyTagged,
	onChangeSortBy = () => {},
	viewAsValue = ViewAs.Cards,
	onChangeViewAs = () => {},
}: Props) => {
	return (
		<div
			className={`flex flex-row flex-wrap justify-start items-center ${
				className ?? ""
			}`}
		>
			<div className="flex flex-row items-center mb-2 md:mb-0 md:mr-6">
				Sort by
				<select className="ml-2" value={sortByValue} onChange={onChangeSortBy}>
					<option value={SortBy.RecentlyTagged}>Recently tagged</option>
					<option value={SortBy.RecentlyAdded}>Recently added</option>
				</select>
			</div>

			<div className="flex flex-row items-center">
				View as
				<select className="ml-2" value={viewAsValue} onChange={onChangeViewAs}>
					<option value={ViewAs.Cards}>Cards</option>
					<option value={ViewAs.Compact}>Compact</option>
				</select>
			</div>
		</div>
	);
};

export default Filters;
