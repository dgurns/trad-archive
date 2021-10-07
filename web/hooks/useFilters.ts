import React, { useState } from "react";
import { FilterType, SortBy, ViewAs } from "types";

import Filters, { Props as FiltersProps } from "components/Filters";

interface Args {
	types?: Array<FilterType>;
	defaultSortByValue?: SortBy;
	defaultViewAsValue?: ViewAs;
}
interface ReturnValue {
	Filters: (props: FiltersProps) => React.ReactElement;
	filtersProps: FiltersProps;
	sortByValue?: SortBy;
	viewAsValue?: ViewAs;
}

// useFilters takes default values for sortBy and viewAs and returns the Filters
// component along with props to pass to it, plus the output sortByValue and
// viewAsValue.
const useFilters = ({
	types = [],
	defaultSortByValue = SortBy.RecentlyTagged,
	defaultViewAsValue = ViewAs.Cards,
}: Args = {}): ReturnValue => {
	const [sortByValue, setSortByValue] = useState(defaultSortByValue);
	const [viewAsValue, setViewAsValue] = useState(defaultViewAsValue);

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setSortByValue(event.target.value as SortBy);
	const onChangeViewAs = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setViewAsValue(event.target.value as ViewAs);

	const filtersProps = {};
	for (const filterType of types) {
		if (filterType === FilterType.SortBy) {
			filtersProps["sortByValue"] = sortByValue;
			filtersProps["onChangeSortBy"] = onChangeSortBy;
		}
		if (filterType === FilterType.ViewAs) {
			filtersProps["viewAsValue"] = viewAsValue;
			filtersProps["onChangeViewAs"] = onChangeViewAs;
		}
	}

	return { Filters, filtersProps, sortByValue, viewAsValue };
};

export default useFilters;
