const localStorageIsAvailable =
	typeof window !== "undefined" && window?.localStorage;

const setItem = (key: string, value: string) => {
	if (localStorageIsAvailable) {
		window.localStorage.setItem(key, value);
	}
};
const getItem = (key: string): string | null | undefined => {
	if (localStorageIsAvailable) {
		return window.localStorage.getItem(key);
	}
	return undefined;
};

const LocalStorageService = {
	setItem,
	getItem,
};
export default LocalStorageService;
