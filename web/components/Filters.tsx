import React, { useMemo } from "react";
import { PerPage, SortBy, ViewAs } from "types";

export interface Props {
	totalItems?: number;
	page?: number;
	onChangePage?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	perPage?: PerPage;
	onChangePerPage?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
	const shouldRenderSortBy = sortBy && onChangeSortBy;
	const shouldRenderViewAs = viewAs && onChangeViewAs;

	const totalPages = useMemo<number>(() => {
		if (typeof totalItems !== "number" || typeof perPage === "undefined") {
			return 0;
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
			className={`flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 ${
				className ?? ""
			}`}
		>
			{shouldRenderPagination && (
				<div
					className={`flex flex-row items-center mr-0 md:mb-0 ${
						shouldRenderSortBy || shouldRenderViewAs ? "mb-4 md:mr-6" : ""
					}`}
				>
					<div className="mr-6">
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
				<div
					className={`flex flex-row items-center mr-0 md:mb-0 ${
						shouldRenderViewAs ? "mb-4 md:mr-6" : ""
					}`}
				>
					Sort by
					<select className="ml-1" value={sortBy} onChange={onChangeSortBy}>
						<option value={SortBy.RecentlyTagged}>Recently tagged</option>
						<option value={SortBy.RecentlyAdded}>Recently added</option>
					</select>
				</div>
			)}

			{shouldRenderViewAs && (
				<div className="flex flex-row items-center mr-0 md:mb-0">
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
