import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isYesterday from "date-fns/isYesterday";

/**
 * @param {number} inputSeconds
 * 	- Number of seconds to convert to a duration
 * @returns {string}
 * 	- Readable duration in the format 10:01:01 (hours:minutes:seconds)
 */
const formatSecondsAsDuration = (inputSeconds: number) => {
	const hours = Math.floor(inputSeconds / (60 * 60));
	const minutes = Math.floor((inputSeconds - hours * 60 * 60) / 60);
	const minutesAsTwoCharString = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const seconds = inputSeconds - hours * 60 * 60 - minutes * 60;
	const secondsAsTwoCharString = seconds < 10 ? `0${seconds}` : `${seconds}`;
	let output = `${minutes}:${secondsAsTwoCharString}`;
	if (hours > 0) {
		output = `${hours}:${minutesAsTwoCharString}:${secondsAsTwoCharString}`;
	}
	return output;
};

const formatDateYear = (
	date?: number | string,
	shouldCapitalize: boolean | undefined = false
) => {
	if (!date) {
		return "";
	}
	const dateObject = new Date(date);
	if (isToday(dateObject)) {
		return format(dateObject, `'${shouldCapitalize ? "T" : "t"}oday`);
	} else if (isYesterday(dateObject)) {
		return format(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday`);
	} else {
		return format(new Date(date), `LLLL d, y`);
	}
};

const formatDateYearTime = (
	date?: number | string,
	shouldCapitalize: boolean | undefined = false
) => {
	if (!date) {
		return "";
	}
	const dateObject = new Date(date);
	if (isToday(dateObject)) {
		return format(
			dateObject,
			`'${shouldCapitalize ? "T" : "t"}oday at' h:mm a`
		);
	} else if (isYesterday(dateObject)) {
		return format(
			dateObject,
			`'${shouldCapitalize ? "Y" : "y"}esterday at' h:mm a`
		);
	} else {
		return format(new Date(date), `LLLL d, y 'at' h:mm a`);
	}
};

const DateTimeService = {
	formatSecondsAsDuration,
	formatDateYear,
	formatDateYearTime,
};
export default DateTimeService;
