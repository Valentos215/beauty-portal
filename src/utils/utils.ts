import { IDay, IDayWithStatus } from 'types/types';
import { EDateStatus, uaMonths } from 'constants/index';

import moment from 'moment';

const exampleSchedule = [
  '8:0',
  '8:30',
  '9:0',
  '9:30',
  '10:0',
  '10:30',
  '11:0',
  '11:30',
  '12:0',
  '12:30',
  '14:0',
  '14:30',
  '15:0',
  '15:30',
]; //mock data
const weekend = [0, 6]; //mock data
const recordAhead = 7; //mock data
const workingHours = ['8:0', '16:0']; //mock data
const breakHours = ['13:0', '13:30']; //mock data

//server side function
export const createSchedule = (): IDay[] => {
  const schedule = [];
  const dateNow = moment();
  const currentDate = moment().startOf('week').add(1, 'day');

  while (currentDate < dateNow.clone().add(recordAhead, 'weeks').endOf('month')) {
    if (
      currentDate < dateNow ||
      weekend.includes(currentDate.day()) ||
      currentDate > dateNow.clone().add(recordAhead, 'weeks')
    ) {
      schedule.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        schedule: [EDateStatus.NonWorking],
      });
    } else {
      schedule.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        schedule: exampleSchedule,
      });
    }
    currentDate.add(1, 'days');
  }
  return schedule;
};

const getDateStatus = (day: IDay) => {
  let status = '';
  if (day.date === `${moment().date()}.${moment().month()}`) {
    status = EDateStatus.Current;
  } else if (!day.schedule.length) {
    status = EDateStatus.FulFilled;
  } else if (day.schedule[0] === EDateStatus.NonWorking) {
    status = EDateStatus.NonWorking;
  } else {
    let lastWorkingHour = moment(workingHours[1], 'h:m').subtract(30, 'minutes');
    let currentTime = moment(workingHours[0], 'h:m');
    while (currentTime <= lastWorkingHour) {
      if (breakHours.includes(`${currentTime.hours()}:${currentTime.minutes()}`)) {
        currentTime.add(30, 'minutes');
        continue;
      }
      if (!day.schedule.includes(`${currentTime.hours()}:${currentTime.minutes()}`)) {
        status = EDateStatus.PartFilled;
        break;
      } else if (
        currentTime.hour() === lastWorkingHour.hour() &&
        currentTime.minutes() === lastWorkingHour.minutes()
      ) {
        status = EDateStatus.Free;
        break;
      }
      currentTime.add(30, 'minutes');
    }
  }
  return status;
};

export const createCalendarState = (schedule: IDay[]): IDayWithStatus[][] => {
  const months: IDayWithStatus[][] = [];
  let chunk: IDayWithStatus[] = [];
  schedule.forEach((day) => {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === day.date.split('.')[1]) {
      chunk.push({ ...day, status: getDateStatus(day) });

      // moving on to the next month
    } else {
      months.push(chunk); // pushing the first month
      chunk = []; // clearing chunk
      let lastDayOfMonth = moment(day.date, 'D.M').add(1, 'month').subtract(1, 'day');
      let lastOfWeek = lastDayOfMonth.clone().endOf('week').add(1, 'day');
      const shift = 7 - lastOfWeek.diff(lastDayOfMonth, 'days');
      //shifting of days in the next month
      for (let i = 0; i < shift; i++) {
        chunk.push({
          date: `\u00A0.${day.date.split('.')[1]}.${i}`,
          schedule: [EDateStatus.NonWorking],
          status: EDateStatus.EmptySpace,
        });
      }
      chunk.push({ ...day, status: getDateStatus(day) });
    }
    if (schedule[schedule.length - 1].date === day.date) {
      months.push(chunk);
    }
  });

  return months;
};

export const getMonthName = (day: IDay) => {
  return uaMonths[Number(day.date.split('.')[1])];
};
