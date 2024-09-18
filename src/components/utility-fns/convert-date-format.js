import { format } from 'date-fns';

export const convertDateFormat = (date) => {
  return format(new Date(date), 'h:mma').toLowerCase();
}