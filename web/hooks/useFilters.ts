import React, { useState } from "react";
import { FilterType, SortBy, ViewAs } from "types";

import Filters, { Props as FiltersProps } from "components/Filters";

interface Args {
	types?: Array<FilterType>;
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
// component along with props to pass to it, plus the output sortBy and
// viewAs.
const useFilters = ({
	types = [],
	defaultSortBy = SortBy.RecentlyTagged,
	defaultViewAs = ViewAs.Card,
}: Args = {}): ReturnValue => {
	const [sortBy, setSortBy] = useState(defaultSortBy);
	const [viewAs, setViewAs] = useState(defaultViewAs);

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setSortBy(event.target.value as SortBy);
	const onChangeViewAs = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setViewAs(event.target.value as ViewAs);

	const filtersProps = {
		types,
		sortBy,
		onChangeSortBy,
		viewAs,
		onChangeViewAs,
	};

	return { Filters, filtersProps, sortBy, viewAs };
};

export default useFilters;
