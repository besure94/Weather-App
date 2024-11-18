import { format, parseISO } from 'date-fns';

export const convertDateFormat = (date) => {
  return format(new Date(date), 'h:mma').toLowerCase();
}

// not currently being used
export const trimTimeToHour = (date) => {
  return format(new Date(date), 'ha').toLowerCase();
}

export const changeDateToWeekday = (date) => {
  const isoDate = parseISO(date);
  return format(new Date(isoDate), 'EEEE');
}