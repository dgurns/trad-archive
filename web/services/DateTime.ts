import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

const formatDate = (
  date?: number | string,
  shouldCapitalize: boolean | undefined = false
) => {
  if (!date) return '';

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
    return format(new Date(date), `LLLL d 'at' h:mm a`);
  }
};

const DateTimeService = {
  formatDate,
};
export default DateTimeService;
