import React, { useCallback } from "react";
import { FilterType, SortByValue, ViewAsValue } from "types";

export interface Props {
	types?: Array<FilterType>;
	sortByValue?: SortByValue;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAsValue?: ViewAsValue;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
}

const Filters = ({
	types = [],
	sortByValue,
	onChangeSortBy,
	viewAsValue,
	onChangeViewAs,
	className,
}: Props) => {
	if (types.length === 0) {
		return null;
	}

	const renderSortBy = useCallback(
		(key) => {
			if (
				!types.includes(FilterType.SortBy) ||
				(!sortByValue && !onChangeSortBy)
			) {
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
					<select
						className="ml-2"
						value={sortByValue}
						onChange={onChangeSortBy}
					>
						<option value={SortByValue.RecentlyTagged}>Recently tagged</option>
						<option value={SortByValue.RecentlyAdded}>Recently added</option>
					</select>
				</div>
			);
		},
		[types, sortByValue, onChangeSortBy]
	);

	const renderViewAs = useCallback(
		(key) => {
			if (
				!types.includes(FilterType.ViewAs) ||
				(!viewAsValue && !onChangeViewAs)
			) {
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
					<select
						className="ml-2"
						value={viewAsValue}
						onChange={onChangeViewAs}
					>
						<option value={ViewAsValue.Card}>Cards</option>
						<option value={ViewAsValue.Compact}>Compact</option>
					</select>
				</div>
			);
		},
		[types, viewAsValue, onChangeViewAs]
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
