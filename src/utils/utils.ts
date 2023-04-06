import moment, { Moment } from 'moment';

export const getStrTime = (time: Moment): string => {
  return `${time.hour()}:${time.minute()}`;
};
export const getMomentTime = (time: string): Moment => {
  return moment(time, 'h:m');
};
export const getStrDate = (date: Moment): string => {
  return `${date.date()}.${date.month()}`;
};

export const getMomentDate = (date: string): Moment => {
  return moment(date, 'D.M');
};
