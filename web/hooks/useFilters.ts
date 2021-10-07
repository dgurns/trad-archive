import React, { useState } from "react";
import { FilterType, SortByValue, ViewAsValue } from "types";

import Filters, { Props as FiltersProps } from "components/Filters";

interface Args {
	types?: Array<FilterType>;
	defaultSortByValue?: SortByValue;
	defaultViewAsValue?: ViewAsValue;
}
interface ReturnValue {
	Filters: (props: FiltersProps) => React.ReactElement;
	filtersProps: FiltersProps;
	sortByValue?: SortByValue;
	viewAsValue?: ViewAsValue;
}

// useFilters takes default values for sortBy and viewAs and returns the Filters
// component along with props to pass to it, plus the output sortByValue and
// viewAsValue.
const useFilters = ({
	types = [],
	defaultSortByValue = SortByValue.RecentlyTagged,
	defaultViewAsValue = ViewAsValue.Card,
}: Args = {}): ReturnValue => {
	const [sortByValue, setSortByValue] = useState(defaultSortByValue);
	const [viewAsValue, setViewAsValue] = useState(defaultViewAsValue);

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setSortByValue(event.target.value as SortByValue);
	const onChangeViewAs = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setViewAsValue(event.target.value as ViewAsValue);

	const filtersProps = {
		types,
		sortByValue,
		onChangeSortBy,
		viewAsValue,
		onChangeViewAs,
	};

	return { Filters, filtersProps, sortByValue, viewAsValue };
};

export default useFilters;
