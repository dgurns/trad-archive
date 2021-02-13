import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

const formatDateYear = (
  date?: number | string,
  shouldCapitalize: boolean | undefined = false
) => {
  if (!date) {
    return '';
  }
  const dateObject = new Date(date);
  if (isToday(dateObject)) {
    return format(dateObject, `'${shouldCapitalize ? 'T' : 't'}oday`);
  } else if (isYesterday(dateObject)) {
    return format(dateObject, `'${shouldCapitalize ? 'Y' : 'y'}esterday`);
  } else {
    return format(new Date(date), `LLLL d, y`);
  }
};

const formatDateYearTime = (
  date?: number | string,
  shouldCapitalize: boolean | undefined = false
) => {
  if (!date) {
    return '';
  }
  const dateObject = new Date(date);
  if (isToday(dateObject)) {
    return format(
      dateObject,
      `'${shouldCapitalize ? 'T' : 't'}oday at' h:mm a`
    );
  } else if (isYesterday(dateObject)) {
    return format(
      dateObject,
      `'${shouldCapitalize ? 'Y' : 'y'}esterday at' h:mm a`
    );
  } else {
    return format(new Date(date), `LLLL d, y 'at' h:mm a`);
  }
};

const DateTimeService = {
  formatDateYear,
  formatDateYearTime,
};
export default DateTimeService;
