import React, { useState, useCallback, useMemo } from "react";
import { PerPage, SortBy, ViewAs } from "types";

import Filters, { Props as FiltersProps } from "components/Filters";

interface Args {
	totalItems?: number;
	defaultPage?: number;
	defaultPerPage?: PerPage;
	defaultSortBy?: SortBy;
	defaultViewAs?: ViewAs;
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
}: Args = {}): ReturnValue => {
	const [page, setPage] = useState(defaultPage);
	const [perPage, setPerPage] = useState(defaultPerPage);
	const [sortBy, setSortBy] = useState(defaultSortBy);
	const [viewAs, setViewAs] = useState(defaultViewAs);

	const onChangePage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setPage(parseInt(event.target.value)),
		[]
	);
	const onChangePerPage = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setPerPage(parseInt(event.target.value)),
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

	const filtersProps = useMemo(
		() => ({
			totalItems,
			page,
			onChangePage,
			perPage,
			onChangePerPage,
			sortBy,
			onChangeSortBy,
			viewAs,
			onChangeViewAs,
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

	return { Filters, filtersProps, page, perPage, sortBy, viewAs };
};

export default useFilters;
