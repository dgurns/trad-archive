import React from "react";
import { SortBy, ViewAs } from "types";

export interface Props {
	className?: string;
	sortByValue?: SortBy;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAsValue?: ViewAs;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters = ({
	className,
	sortByValue,
	onChangeSortBy,
	viewAsValue,
	onChangeViewAs,
}: Props) => {
	if (!sortByValue && !onChangeSortBy && !viewAsValue && !onChangeViewAs) {
		return null;
	}

	const shouldShowSortBy = sortByValue && onChangeSortBy;
	const shouldShowViewAs = viewAsValue && onChangeViewAs;

	return (
		<div
			className={`flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center ${
				className ?? ""
			}`}
		>
			{shouldShowSortBy && (
				<div className="flex flex-row items-center mb-2 md:mb-0 mr-0 md:mr-6">
					Sort by
					<select
						className="ml-2"
						value={sortByValue}
						onChange={onChangeSortBy}
					>
						<option value={SortBy.RecentlyTagged}>Recently tagged</option>
						<option value={SortBy.RecentlyAdded}>Recently added</option>
					</select>
				</div>
			)}
			{shouldShowViewAs && (
				<div className="flex flex-row items-center">
					View as
					<select
						className="ml-2"
						value={viewAsValue}
						onChange={onChangeViewAs}
					>
						<option value={ViewAs.Cards}>Cards</option>
						<option value={ViewAs.Compact}>Compact</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default Filters;
