import { IDaySchedule } from 'types/types';
import { EDateStatus, uaMonths } from 'constants/index';

import moment from 'moment';

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
const weekend = [0, 6]; //mock data
const recordAhead = 7; //mock data

//server side function
export const createSchedule = () => {
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

export const separateByMonths = (schedule: IDaySchedule[]) => {
  const months: IDaySchedule[][] = [];
  let chunk: IDaySchedule[] = [];
  schedule.forEach((day) => {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === day.date.split('.')[1]) {
      chunk.push(day);

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
        });
      }
      chunk.push(day);
    }
    if (schedule[schedule.length - 1].date === day.date) {
      months.push(chunk);
    }
  });

  return months;
};

export const getMonthName = (day: IDaySchedule) => {
  return uaMonths[Number(day.date.split('.')[1])];
};

export const getDateStatus = (day: IDaySchedule, workingHours: string[]) => {
  let status = '';
  if (day.date === `${moment().date()}.${moment().month()}`) {
    status = EDateStatus.Current;
  } else if (!day.schedule.length) {
    status = EDateStatus.FulFilled;
  } else if (day.schedule[0] === EDateStatus.NonWorking) {
    status = EDateStatus.NonWorking;
  } else {
    let endOfDay = moment(workingHours[1], 'h:m');
    let currentTime = moment(workingHours[0], 'h:m');
    while (currentTime < endOfDay) {
      if (day.schedule.includes(`${currentTime.hours()}:${currentTime.minutes()}`)) {
        if (currentTime === endOfDay.clone().subtract(30, 'minutes')) {
          status = EDateStatus.Free;
          break;
        }
        currentTime.add(30, 'minutes');
      } else {
        status = EDateStatus.PartFilled;
        break;
      }
    }
  }
  return status;
};
