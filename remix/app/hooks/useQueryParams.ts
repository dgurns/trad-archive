import { useCallback, useMemo } from "react";
import { useNavigate } from "@remix-run/react";

interface ReturnValue {
	getQueryParams: () => Record<string, string>;
	updateQueryParams: (paramsToUpdate: Record<string, string | null>) => void;
	clearQueryParams: () => void;
}
const useQueryParams = (): ReturnValue => {
	const navigate = useNavigate();

	const getQueryParams = useCallback(() => {
		if (typeof window === "undefined") {
			return {};
		}
		const queryParams = new URLSearchParams(window.location.search);
		const outputObject = {};
		for (const key of queryParams.keys()) {
			outputObject[key] = queryParams.get(key);
		}
		return outputObject;
	}, []);

	const updateQueryParams = useCallback(
		(paramsToUpdate: Record<string, string | null> = {}) => {
			if (typeof window === "undefined") {
				return;
			}
			const queryParams = new URLSearchParams(window.location.search);

			const paramNames = Object.keys(paramsToUpdate);
			paramNames.forEach((paramName) => {
				const value = paramsToUpdate[paramName];
				if (value) {
					queryParams.set(paramName, value);
				} else {
					queryParams.delete(paramName);
				}
			});

			return navigate(`${window.location.pathname}?${queryParams.toString()}`);
		},
		[navigate]
	);

	const clearQueryParams = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}
		navigate(window.location.pathname);
	}, [navigate]);

	const returnValue = useMemo(
		() => ({
			getQueryParams,
			updateQueryParams,
			clearQueryParams,
		}),
		[getQueryParams, updateQueryParams, clearQueryParams]
	);

	return returnValue;
};

export default useQueryParams;
