import type React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import type { PerPage, SortBy, ViewAs } from "~/types";

import useQueryParams from "~/hooks/useQueryParams";
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
	defaultPage,
	defaultPerPage,
	defaultSortBy,
	defaultViewAs,
	enableQueryParams = true,
}: Args = {}): ReturnValue => {
	const { getQueryParams, updateQueryParams, clearQueryParams } =
		useQueryParams();
	const queryParams = getQueryParams();

	// If query params are enabled and set in the URL, use them as default values
	const initialPage = enableQueryParams
		? parseInt(queryParams.page, 10) || defaultPage
		: defaultPage;
	const initialPerPage = enableQueryParams
		? parseInt(queryParams.perPage, 10) || defaultPerPage
		: defaultPerPage;
	const initialSortBy = enableQueryParams
		? (queryParams.sortBy as SortBy) ?? defaultSortBy
		: defaultSortBy;
	const initialViewAs = enableQueryParams
		? (queryParams.viewAs as ViewAs) ?? defaultViewAs
		: defaultViewAs;

	const [page, setPage] = useState<number>(initialPage);
	const [perPage, setPerPage] = useState<number>(initialPerPage);
	const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);
	const [viewAs, setViewAs] = useState<ViewAs>(initialViewAs);

	// Update query params when state changes
	useEffect(() => {
		if (!enableQueryParams) {
			return;
		}
		updateQueryParams({
			page: page ? `${page}` : null,
			perPage: perPage ? `${perPage}` : null,
			sortBy,
			viewAs,
		});
	}, [enableQueryParams, page, perPage, sortBy, viewAs]);

	// Clear query params on unmount
	useEffect(() => {
		if (!enableQueryParams) {
			return;
		}
		return () => clearQueryParams();
	}, [enableQueryParams]);

	const onChangePage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setPage(parseInt(event.target.value)),
		[]
	);
	const onChangePerPage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setPerPage(parseInt(event.target.value));
			setPage(1);
		},
		[]
	);
	const onChangeSortBy = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setSortBy(event.target.value as SortBy),
		[]
	);
	const onChangeViewAs = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setViewAs(event.target.value as ViewAs),
		[]
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
			Filters,
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
