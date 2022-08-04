import type React from "react";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "@remix-run/react";

import type { PerPage } from "~/types";
import { SortBy, ViewAs } from "~/types";

import type { Props as FiltersProps } from "~/components/Filters";
import Filters from "~/components/Filters";

interface Args {
	totalItems?: number;
	defaultPage?: number; // Starts at 1
	defaultPerPage?: PerPage;
	defaultSortBy?: SortBy;
	defaultViewAs?: ViewAs;
	enableQueryParams?: boolean;
}
interface ReturnValue {
	Filters: (props: FiltersProps) => React.ReactElement;
	filtersProps: FiltersProps;
	page?: number;
	perPage?: PerPage;
	sortBy?: SortBy;
	viewAs?: ViewAs;
}

// useFilters takes default values for sortBy and viewAs and returns the Filters
// component along with props to pass to it, plus the current sortBy and
// viewAs values.
const useFilters = ({
	totalItems,
	defaultPage = 1,
	defaultPerPage = 20,
	defaultSortBy = SortBy.DateAddedOldToNew,
	defaultViewAs = ViewAs.Cards,
}: Args = {}): ReturnValue => {
	const navigate = useNavigate();
	const { pathname, search } = useLocation();
	const queryParams = new URLSearchParams(search);

	// Pull filter values from query params. If not set, use defaults.
	const page = parseInt(queryParams.get("page") ?? "1", 10) || defaultPage;
	const perPage =
		parseInt(queryParams.get("perPage") ?? "20", 10) || defaultPerPage;
	const sortBy = (queryParams.get("sortBy") as SortBy) ?? defaultSortBy;
	const viewAs = (queryParams.get("viewAs") as ViewAs) ?? defaultViewAs;

	const updateQueryParams = useCallback(
		(paramsToUpdate: Record<string, string | null> = {}) => {
			const queryParams = new URLSearchParams(search);

			const paramNames = Object.keys(paramsToUpdate);
			paramNames.forEach((paramName) => {
				const value = paramsToUpdate[paramName];
				if (value) {
					queryParams.set(paramName, value);
				} else {
					queryParams.delete(paramName);
				}
			});

			return navigate(`${pathname}?${queryParams.toString()}`);
		},
		[navigate, pathname, search]
	);

	const onChangePage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			updateQueryParams({ page: event.target.value }),
		[updateQueryParams]
	);
	const onChangePerPage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			updateQueryParams({ perPage: event.target.value, page: "1" }),
		[updateQueryParams]
	);
	const onChangeSortBy = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			updateQueryParams({ sortBy: event.target.value as SortBy }),
		[updateQueryParams]
	);
	const onChangeViewAs = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			updateQueryParams({ viewAs: event.target.value as ViewAs }),
		[updateQueryParams]
	);

	const returnValue = useMemo(
		() => ({
			Filters,
			filtersProps: {
				totalItems,
				page,
				onChangePage,
				perPage,
				onChangePerPage,
				sortBy,
				onChangeSortBy,
				viewAs,
				onChangeViewAs,
			},
			page,
			perPage,
			sortBy,
			viewAs,
		}),
		[
			totalItems,
			page,
			onChangePage,
			perPage,
			onChangePerPage,
			sortBy,
			onChangeSortBy,
			viewAs,
			onChangeViewAs,
		]
	);

	return returnValue;
};

export default useFilters;
