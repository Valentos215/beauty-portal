import { uaMonths } from 'constants/index';

import moment from 'moment';

interface IDaySchedule {
  date: string;
  schedule: string[];
}

const exampleSchedule = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
];

export const createSchedule = () => {
  const weekend = [5, 6];
  const recordAhead = 4;
  const schedule = [];
  const dateNow = moment();
  const currentDate = moment().startOf('week');

  while (currentDate < dateNow.clone().add(recordAhead, 'weeks').endOf('month')) {
    if (
      currentDate < dateNow ||
      weekend.includes(currentDate.day()) ||
      currentDate > dateNow.clone().add(recordAhead, 'weeks')
    ) {
      schedule.push({
        date: `${currentDate.date()}:${currentDate.month()}`,
        schedule: [],
      });
    } else {
      schedule.push({
        date: `${currentDate.date()}:${currentDate.month()}`,
        schedule: exampleSchedule,
      });
    }
    currentDate.add(1, 'days');
  }
  return schedule;
};

export const getMonths = (schedule: IDaySchedule[]) => {
  const months: IDaySchedule[][] = [];
  let chunk: IDaySchedule[] = [];
  schedule.forEach((day) => {
    if (chunk[0].date.split(':')[1] === day.date.split(':')[1]) {
      chunk.push(day);
    } else {
      months.push(chunk);
      chunk = [day];
    }
  });

  return months;
};

export const getMonthName = (day: IDaySchedule) => {
  return uaMonths[Number(day.date.split(':')[1])];
};
