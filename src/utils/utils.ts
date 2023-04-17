import { uaMonthsVidminok } from 'constants/index';
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

export const getTimeFormat = (time: string) => {
  const splitedTime = time.split(':');
  return `${('0' + splitedTime[0]).slice(-2)}:${('0' + splitedTime[1]).slice(-2)}`;
};

export const getDateTextFormat = (date: string) => {
  const splitedDate = date.split('.');
  return `${splitedDate[0]} ${uaMonthsVidminok[Number(splitedDate[1])]}`;
};
