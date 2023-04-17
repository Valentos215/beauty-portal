import { IArtistCabinetData, ITimeLine } from 'types/types';
import { ETimeTitle, ETimeStatus } from 'constants/index';
import { getMomentTime, getStrTime } from 'utils/utils';
import moment, { Moment } from 'moment';

export const createDayTimeline = (
  artistCabinetData: IArtistCabinetData,
  date: string,
): ITimeLine[] => {
  const { workingHours, breakHours, proceduresList } = artistCabinetData;
  let dayTimeline = [];
  let currentTime = getMomentTime(workingHours[0]);
  let endOfDay = getMomentTime(workingHours[1]);
  let freeTimeStart: Moment | null = null;

  // callback fn adds free time slot to timeline
  const writeFreeTime = (freeTimeEnd: Moment) => {
    if (freeTimeStart) {
      dayTimeline.push({
        startTime: getStrTime(freeTimeStart),
        endTime: getStrTime(freeTimeEnd),
        title: ETimeTitle.Free,
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
        title: ETimeTitle.BreakHours,
        timeStatus: ETimeStatus.BreakHours,
      });
      currentTime = getMomentTime(breakHours[1]);
    }

    const currentTimeString = getStrTime(currentTime);
    const currentProcedure = proceduresList.find(
      (proc) => proc.date === date && proc.startTime === currentTimeString,
    );
    // add procedure to the timeline
    if (currentProcedure) {
      writeFreeTime(currentTime);
      const { startTime, duration } = currentProcedure;
      const endOfProcedure = getMomentTime(startTime).add(duration, 'minutes');
      const { categoryTitle, clientName, clientPhone, description } = currentProcedure;
      dayTimeline.push({
        startTime: startTime,
        endTime: getStrTime(endOfProcedure),
        title: categoryTitle || ETimeTitle.Reserved,
        timeStatus: categoryTitle ? ETimeStatus.Procedure : ETimeStatus.CustomProcedure,
        clientName,
        clientPhone,
        description,
      });
      currentTime = endOfProcedure;
      continue;
    }
    // set start of free time slot
    if (!freeTimeStart) {
      freeTimeStart = currentTime.clone();
    }
    // add free time slot to the timeline at the end of the day
    if (getStrTime(currentTime.clone().add(30, 'minutes')) === workingHours[1]) {
      writeFreeTime(getMomentTime(workingHours[1]));
    }

    // increment of cycle
    currentTime.add(30, 'minutes');
  }
  return dayTimeline;
};
