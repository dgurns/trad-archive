import React, { useMemo } from "react";
import { PerPage, SortBy, ViewAs } from "~/types";

export interface Props {
	totalItems?: number;
	page?: number;
	onChangePage?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	perPage?: PerPage;
	onChangePerPage?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	sortByOptions?: SortBy[];
	sortBy?: SortBy;
	onChangeSortBy?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	viewAs?: ViewAs;
	onChangeViewAs?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
}

const Filters = ({
	totalItems,
	page,
	onChangePage,
	perPage,
	onChangePerPage,
	sortByOptions = [],
	sortBy,
	onChangeSortBy,
	viewAs,
	onChangeViewAs,
	className,
}: Props) => {
	const shouldRenderPagination =
		typeof totalItems === "number" &&
		typeof page === "number" &&
		onChangePage &&
		perPage &&
		onChangePerPage;
	const shouldRenderSortBy =
		sortByOptions.length > 0 && sortBy && onChangeSortBy;
	const shouldRenderViewAs = viewAs && onChangeViewAs;

	const totalPages = useMemo<number>(() => {
		if (
			typeof totalItems !== "number" ||
			typeof perPage === "undefined" ||
			totalItems === 0
		) {
			return 1;
		}
		return Math.ceil(totalItems / perPage);
	}, [totalItems, perPage]);

	const pageSelectOptions = useMemo(() => {
		const output: React.ReactNode[] = [];
		let i = 1;
		while (i <= totalPages) {
			output.push(
				<option value={i} key={i}>
					{i}
				</option>
			);
			i++;
		}
		return output;
	}, [totalPages]);

	const perPageOptions = useMemo(() => {
		const output: React.ReactNode[] = [];
		for (const value in PerPage) {
			if (isNaN(Number(value))) {
				continue;
			}
			output.push(
				<option value={value} key={value}>
					{value}
				</option>
			);
		}
		return output;
	}, []);

	return (
		<div
			className={`flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 space-y-4 space-x-0 md:space-y-0 md:space-x-5 ${
				className ?? ""
			}`}
		>
			{shouldRenderPagination && (
				<div className="flex flex-row items-center space-x-5">
					<div>
						{totalItems.toLocaleString()} Item{totalItems === 1 ? "" : "s"}
					</div>
					<div>
						Page{" "}
						<select value={page} onChange={onChangePage}>
							{pageSelectOptions}
						</select>
						{totalPages ? ` of ${totalPages}` : ""}
					</div>
					<div>
						<select value={perPage} onChange={onChangePerPage}>
							{perPageOptions}
						</select>{" "}
						per page
					</div>
				</div>
			)}

			{shouldRenderSortBy && (
				<div className="flex flex-row items-center">
					Sort by
					<select className="ml-1" value={sortBy} onChange={onChangeSortBy}>
						{sortByOptions.includes(SortBy.RecentlyTagged) && (
							<option value={SortBy.RecentlyTagged}>Recently Tagged</option>
						)}
						{sortByOptions.includes(SortBy.DateAddedOldToNew) && (
							<option value={SortBy.DateAddedOldToNew}>
								Date Added (Old to New)
							</option>
						)}
						{sortByOptions.includes(SortBy.DateSavedOldToNew) && (
							<option value={SortBy.DateSavedOldToNew}>
								Date Saved (Old to New)
							</option>
						)}
					</select>
				</div>
			)}

			{shouldRenderViewAs && (
				<div className="hidden md:flex flex-row items-center">
					View as
					<select className="ml-1" value={viewAs} onChange={onChangeViewAs}>
						<option value={ViewAs.Cards}>Cards</option>
						<option value={ViewAs.Compact}>Compact</option>
						<option value={ViewAs.List}>List</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default Filters;
