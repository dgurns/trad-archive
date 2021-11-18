import React, { useCallback } from "react";
import { FilterType, SortBy, ViewAs } from "types";

export interface Props {
	types?: Array<FilterType>;
	sortBy?: SortBy;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAs?: ViewAs;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
}

const Filters = ({
	types = [],
	sortBy,
	onChangeSortBy,
	viewAs,
	onChangeViewAs,
	className,
}: Props) => {
	if (types.length === 0) {
		return null;
	}

	const renderSortBy = useCallback(
		(key) => {
			if (!types.includes(FilterType.SortBy) || (!sortBy && !onChangeSortBy)) {
				return null;
			}
			return (
				<div
					className={`flex flex-row items-center mr-0 md:mb-0 ${
						types.length > 1 ? "mb-2 md:mr-6" : ""
					}`}
					key={key}
				>
					Sort by
					<select className="ml-2" value={sortBy} onChange={onChangeSortBy}>
						<option value={SortBy.RecentlyTagged}>Recently tagged</option>
						<option value={SortBy.RecentlyAdded}>Recently added</option>
					</select>
				</div>
			);
		},
		[types, sortBy, onChangeSortBy]
	);

	const renderViewAs = useCallback(
		(key) => {
			if (!types.includes(FilterType.ViewAs) || (!viewAs && !onChangeViewAs)) {
				return null;
			}
			return (
				<div
					className={`flex flex-row items-center mr-0 md:mb-0 ${
						types.length > 1 ? "mb-2 md:mr-6" : ""
					}`}
					key={key}
				>
					View as
					<select className="ml-2" value={viewAs} onChange={onChangeViewAs}>
						<option value={ViewAs.Card}>Cards</option>
						<option value={ViewAs.Compact}>Compact</option>
						<option value={ViewAs.List}>List</option>
					</select>
				</div>
			);
		},
		[types, viewAs, onChangeViewAs]
	);

	return (
		<div
			className={`flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center ${
				className ?? ""
			}`}
		>
			{types.map((type, index) => {
				if (type === FilterType.SortBy) {
					return renderSortBy(index);
				} else if (type === FilterType.ViewAs) {
					return renderViewAs(index);
				}
			})}
		</div>
	);
};

export default Filters;
