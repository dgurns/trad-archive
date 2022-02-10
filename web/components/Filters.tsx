import React from "react";
import { SortBy, ViewAs } from "types";

export interface Props {
	sortBy?: SortBy;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAs?: ViewAs;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
}

const Filters = ({
	sortBy,
	onChangeSortBy,
	viewAs,
	onChangeViewAs,
	className,
}: Props) => {
	const shouldRenderSortBy = sortBy && onChangeSortBy;
	const shouldRenderViewAs = viewAs && onChangeViewAs;

	return (
		<div
			className={`flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center ${
				className ?? ""
			}`}
		>
			{shouldRenderSortBy && (
				<div
					className={`flex flex-row items-center mr-0 md:mb-0 ${
						shouldRenderViewAs ? "mb-2 md:mr-6" : ""
					}`}
				>
					Sort by
					<select className="ml-2" value={sortBy} onChange={onChangeSortBy}>
						<option value={SortBy.RecentlyTagged}>Recently tagged</option>
						<option value={SortBy.RecentlyAdded}>Recently added</option>
					</select>
				</div>
			)}

			{shouldRenderViewAs && (
				<div className="flex flex-row items-center mr-0 md:mb-0">
					View as
					<select className="ml-2" value={viewAs} onChange={onChangeViewAs}>
						<option value={ViewAs.Card}>Cards</option>
						<option value={ViewAs.Compact}>Compact</option>
						<option value={ViewAs.List}>List</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default Filters;
