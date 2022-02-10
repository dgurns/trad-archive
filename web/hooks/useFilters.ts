import React, { useState, useCallback, useMemo } from "react";
import { SortBy, ViewAs } from "types";

import Filters, { Props as FiltersProps } from "components/Filters";

interface Args {
	defaultSortBy?: SortBy;
	defaultViewAs?: ViewAs;
}
interface ReturnValue {
	Filters: (props: FiltersProps) => React.ReactElement;
	filtersProps: FiltersProps;
	sortBy?: SortBy;
	viewAs?: ViewAs;
}

// useFilters takes default values for sortBy and viewAs and returns the Filters
// component along with props to pass to it, plus the current sortBy and
// viewAs values.
const useFilters = ({
	defaultSortBy,
	defaultViewAs,
}: Args = {}): ReturnValue => {
	const [sortBy, setSortBy] = useState(defaultSortBy);
	const [viewAs, setViewAs] = useState(defaultViewAs);

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
			sortBy,
			onChangeSortBy,
			viewAs,
			onChangeViewAs,
		}),
		[sortBy, onChangeSortBy, viewAs, onChangeViewAs]
	);

	return { Filters, filtersProps, sortBy, viewAs };
};

export default useFilters;
