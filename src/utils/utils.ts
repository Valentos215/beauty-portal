import { IDayWithStatus, IClientCabinetData, IArtistCabinetData, ITimeLine } from 'types/types';
import { EDateStatus, uaMonths, ETimeTitle, ETimeStatus } from 'constants/index';

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

const getArtistDayStatus = (date: Moment, cabinetData: IArtistCabinetData): string => {
  const { weekend, recordAhead, workingHours, breakHours, dateNow, proceduresList } = cabinetData;
  let dayStatus = '';
  if (
    date < getMomentDate(dateNow).add(1, 'month') ||
    date > getMomentDate(dateNow).add(1, 'month').add(recordAhead, 'weeks') ||
    weekend.includes(date.day())
  ) {
    dayStatus = EDateStatus.NonWorking;
  } else if (!proceduresList.some((procedure) => procedure.date === getStrDate(date))) {
    dayStatus = EDateStatus.Free;
  } else {
    let currentTime = getMomentTime(workingHours[0]);
    let endOfDay = getMomentTime(workingHours[1]);
    let freeHoursCounter = 0;
    const proceduresToday = proceduresList.filter(
      (procedure) => procedure.date === getStrDate(date),
    );
    while (currentTime < endOfDay) {
      // skip breaks
      if (getStrTime(currentTime) === breakHours[0]) {
        currentTime = getMomentTime(breakHours[1]);
      }
      let currentTimeString = getStrTime(currentTime);
      let currentProcedure = proceduresToday.find((proc) => proc.startTime === currentTimeString);
      // skip procedure time
      if (currentProcedure) {
        const { startTime, duration } = currentProcedure;
        currentTime = getMomentTime(startTime).add(duration, 'minutes');
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

export const createArtistCalendar = (artistCabinetData: IArtistCabinetData): IDayWithStatus[][] => {
  const months: IDayWithStatus[][] = [];
  let chunk: IDayWithStatus[] = [];
  const { recordAhead, dateNow } = artistCabinetData;
  const currentDate = getMomentDate(dateNow).add(1, 'month').startOf('week').add(1, 'day');
  const endOfLastMonth = getMomentDate(dateNow)
    .add(1, 'month')
    .add(recordAhead, 'weeks')
    .endOf('month');

  while (currentDate <= endOfLastMonth) {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === String(currentDate.month())) {
      chunk.push({
        date: getStrDate(currentDate),
        status: getArtistDayStatus(currentDate, artistCabinetData),
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
        date: getStrDate(currentDate),
        status: getArtistDayStatus(currentDate, artistCabinetData),
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

export const createClientCalendar = (clientCabinetData: IClientCabinetData): IDayWithStatus[][] => {
  const { proceduresList, dateNow } = clientCabinetData;
  const months: IDayWithStatus[][] = [];
  let chunk: IDayWithStatus[] = [];
  const currentDate = getMomentDate(dateNow).add(1, 'month').startOf('week').add(1, 'day');
  let endOfMonth = getMomentDate(dateNow).add(1, 'month').endOf('month');
  let endOfWeek = getMomentDate(dateNow).add(1, 'month').endOf('week').add(1, 'day');
  const shift = 7 - endOfWeek.diff(endOfMonth, 'days');
  const endOfNextMonth = endOfMonth.clone().add(1, 'day').endOf('month');
  const getStatus = (date: Moment) => {
    if (date < getMomentDate(dateNow)) {
      return EDateStatus.NonWorking;
    } else if (proceduresList.some((procedure) => procedure.date === getStrDate(date))) {
      return EDateStatus.PartFilled;
    } else {
      return EDateStatus.Free;
    }
  };
  while (currentDate <= endOfNextMonth) {
    // first month
    if (!chunk.length || chunk[0].date.split('.')[1] === String(currentDate.month())) {
      chunk.push({
        date: getStrDate(currentDate),
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
        date: getStrDate(currentDate),
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

export const createDayTimeline = (
  artistCabinetData: IArtistCabinetData,
  date: string,
): ITimeLine[] => {
  const { workingHours, breakHours, proceduresList } = artistCabinetData;
  let dayTimeline = [];
  let currentTime = getMomentTime(workingHours[0]);
  let endOfDay = getMomentTime(workingHours[1]);
  let freeTimeStart: Moment | null = null;

  const writeFreeTime = (freeTimeEnd: Moment) => {
    if (freeTimeStart) {
      dayTimeline.push({
        startTime: getStrTime(freeTimeStart),
        endTime: getStrTime(freeTimeEnd),
        categoryTitle: ETimeTitle.Free,
        timeStatus: ETimeStatus.Free,
      });
      freeTimeStart = null;
    }
  };

  while (currentTime < endOfDay) {
    // skip breaks and add them to the timeline
    if (getStrTime(currentTime) === breakHours[0]) {
      writeFreeTime(currentTime);
      dayTimeline.push({
        startTime: breakHours[0],
        endTime: breakHours[1],
        categoryTitle: ETimeTitle.BreakHours,
        timeStatus: ETimeStatus.BreakHours,
      });
      currentTime = getMomentTime(breakHours[1]);
    }

    const currentTimeString = getStrTime(currentTime);
    const currentProcedure = proceduresList.find(
      (proc) => proc.date === date && proc.startTime === currentTimeString,
    );
    if (currentProcedure) {
      writeFreeTime(currentTime);
      const { startTime, duration } = currentProcedure;
      const endOfProcedure = getMomentTime(startTime).add(duration, 'minutes');
      const { categoryTitle, clientName, clientPhone, description } = currentProcedure;
      dayTimeline.push({
        startTime: startTime,
        endTime: getStrTime(endOfProcedure),
        categoryTitle: categoryTitle,
        timeStatus: categoryTitle ? '' : ETimeStatus.CustomProcedure,
        clientName,
        clientPhone,
        description,
      });
      currentTime = endOfProcedure;
      continue;
    }

    if (!freeTimeStart) {
      freeTimeStart = currentTime.clone();
    }
    if (getStrTime(currentTime.clone().add(30, 'minutes')) === workingHours[1]) {
      writeFreeTime(getMomentTime(workingHours[1]));
    }

    // increment of cycle
    currentTime.add(30, 'minutes');
  }
  return dayTimeline;
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
