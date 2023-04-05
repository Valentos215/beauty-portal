import { IDayWithStatus, IClientCabinetData, IArtistCabinetData } from 'types/types';
import { EDateStatus, uaMonths } from 'constants/index';

import moment, { Moment } from 'moment';

const getArtistDayStatus = (date: Moment, cabinetData: IArtistCabinetData): string => {
  const { weekend, recordAhead, workingHours, breakHours, dateNow, proceduresList } = cabinetData;
  let dayStatus = '';
  if (
    date < moment(dateNow, 'D.M').add(1, 'month') ||
    date > moment(dateNow, 'D.M').add(1, 'month').add(recordAhead, 'weeks') ||
    weekend.includes(date.day())
  ) {
    dayStatus = EDateStatus.NonWorking;
  } else if (
    !proceduresList.some((procedure) => procedure.date === `${date.date()}.${date.month()}`)
  ) {
    dayStatus = EDateStatus.Free;
  } else {
    let currentTime = moment(workingHours[0], 'h:m');
    let endOfDay = moment(workingHours[1], 'h:m');
    let freeHoursCounter = 0;
    const proceduresToday = proceduresList.filter(
      (procedure) => procedure.date === `${date.date()}.${date.month()}`,
    );
    while (currentTime < endOfDay) {
      // skip breaks
      if (`${currentTime.hour()}:${currentTime.minute()}` === breakHours[0]) {
        currentTime = moment(breakHours[1], 'h:m');
      }
      let currentTimeString = `${currentTime.hour()}:${currentTime.minute()}`;
      let currentProcedure = proceduresToday.find((proc) => proc.startTime === currentTimeString);
      // skip procedure time
      if (currentProcedure) {
        currentTime = moment(currentProcedure.startTime, 'h:m').add(
          currentProcedure.duration,
          'minutes',
        );
        // add 30 minutes
      } else {
        freeHoursCounter++;
        currentTime.add(30, 'minutes');
      }
    }
    if (freeHoursCounter > 0) {
      dayStatus = EDateStatus.PartFilled;
    } else {
      dayStatus = EDateStatus.FulFilled;
    }
  }
  return dayStatus;
};

export const createArtistCalendar = (cabinetData: IArtistCabinetData): IDayWithStatus[][] => {
  const months: IDayWithStatus[][] = [];
  let chunk: IDayWithStatus[] = [];
  const { recordAhead, dateNow } = cabinetData;
  const currentDate = moment(dateNow, 'D.M').add(1, 'month').startOf('week').add(1, 'day');
  const endOfLastMonth = moment(dateNow, 'D.M')
    .add(1, 'month')
    .add(recordAhead, 'weeks')
    .endOf('month');

  while (currentDate <= endOfLastMonth) {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === String(currentDate.month())) {
      chunk.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        status: getArtistDayStatus(currentDate, cabinetData),
      });
      // moving on to the next month
    } else {
      months.push(chunk); // pushing the first month
      chunk = []; // clearing chunk
      //shifting of days in the next month
      let endOfMonth = currentDate.clone().subtract(1, 'day').endOf('month');
      let endOfWeek = currentDate.clone().subtract(1, 'day').endOf('week').add(1, 'day');
      const shift = 7 - endOfWeek.diff(endOfMonth, 'days');
      for (let i = 0; i < shift; i++) {
        chunk.push({
          date: `\u00A0.${currentDate.month()}.${i}`,
          status: EDateStatus.EmptySpace,
        });
      }
      chunk.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        status: getArtistDayStatus(currentDate, cabinetData),
      });
    }
    if (
      currentDate.date() === endOfLastMonth.date() &&
      currentDate.month() === endOfLastMonth.month()
    ) {
      months.push(chunk);
    }
    currentDate.add(1, 'day');
  }

  return months;
};

export const createClientCalendar = (cabinetData: IClientCabinetData): IDayWithStatus[][] => {
  const { proceduresList, dateNow } = cabinetData;
  const months: IDayWithStatus[][] = [];
  let chunk: IDayWithStatus[] = [];
  const currentDate = moment(dateNow, 'D.M').add(1, 'month').startOf('week').add(1, 'day');
  let endOfMonth = moment(dateNow, 'D.M').add(1, 'month').endOf('month');
  let endOfWeek = moment(dateNow, 'D.M').add(1, 'month').endOf('week').add(1, 'day');
  const shift = 7 - endOfWeek.diff(endOfMonth, 'days');
  const endOfNextMonth = endOfMonth.clone().add(1, 'day').endOf('month');
  const getStatus = (date: Moment) => {
    if (date < moment(dateNow, 'D.M')) {
      return EDateStatus.NonWorking;
    } else if (
      proceduresList.some((procedure) => procedure.date === `${date.date()}.${date.month()}`)
    ) {
      return EDateStatus.PartFilled;
    } else {
      return EDateStatus.Free;
    }
  };
  while (currentDate <= endOfNextMonth) {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === String(currentDate.month())) {
      chunk.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        status: getStatus(currentDate),
      });
      // moving on to the next month
    } else {
      months.push(chunk); // pushing the first month
      chunk = []; // clearing chunk
      //shifting of days in the next month
      for (let i = 0; i < shift; i++) {
        chunk.push({
          date: `\u00A0.${currentDate.month()}.${i}`,
          status: EDateStatus.EmptySpace,
        });
      }
      chunk.push({
        date: `${currentDate.date()}.${currentDate.month()}`,
        status: getStatus(currentDate),
      });
    }
    if (
      currentDate.date() === endOfNextMonth.date() &&
      currentDate.month() === endOfNextMonth.month()
    ) {
      months.push(chunk);
    }
    currentDate.add(1, 'day');
  }

  return months;
};

export const getMonthName = (day: IDayWithStatus) => {
  return uaMonths[Number(day.date.split('.')[1])];
};

//server side function
// export const createSchedule = (): IDay[] => {
// 	const schedule = [];
// 	const dateNow = moment();
// 	const currentDate = moment().startOf('week').add(1, 'day');

// 	while (currentDate < dateNow.clone().add(recordAhead, 'weeks').endOf('month')) {
// 	  if (
// 		 currentDate < dateNow ||
// 		 weekend.includes(currentDate.day()) ||
// 		 currentDate > dateNow.clone().add(recordAhead, 'weeks')
// 	  ) {
// 		 schedule.push({
// 			date: `${currentDate.date()}.${currentDate.month()}`,
// 			schedule: [EDateStatus.NonWorking],
// 		 });
// 	  } else {
// 		 schedule.push({
// 			date: `${currentDate.date()}.${currentDate.month()}`,
// 			schedule: exampleSchedule,
// 		 });
// 	  }
// 	  currentDate.add(1, 'days');
// 	}
// 	return schedule;
//  };
