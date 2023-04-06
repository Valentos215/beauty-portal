import { memo } from 'react';

import { IDayWithStatus } from 'types/types';
import { getMonthName } from './utils/calendar-utils';
import s from './Calendar.module.scss';
import { uaDays, EDateStatus } from 'constants/index';
import moment from 'moment';

interface ICalendarProps {
  calendarState: IDayWithStatus[][];
  setSelectedDate: (date: string) => void;
}

const Calendar = memo(({ calendarState, setSelectedDate }: ICalendarProps) => {
  const dayClassName = (day: IDayWithStatus) => {
    if (day.date === `${moment().date()}.${moment().month()}`) {
      return `${s.day} ${s[day.status]} ${s.current}`;
    }
    return `${s.day} ${s[day.status]}`;
  };
  const isDisabled = (dayStatus: string) => {
    return dayStatus === EDateStatus.NonWorking || dayStatus === EDateStatus.EmptySpace;
  };

  return (
    <div className={s.wrapper}>
      {calendarState.map((month) => (
        <div className={s.month} key={month[0].date}>
          <h4>{getMonthName(month[0])}</h4>
          <div className={s.calendar}>
            {uaDays.map((weekDay) => (
              <div className={s.day_wrapper} key={weekDay}>
                <span className={`${s.day} ${s.week_day}`}>{weekDay}</span>
              </div>
            ))}
            {month.map((day) => (
              <div className={s.day_wrapper} key={day.date}>
                <button
                  disabled={isDisabled(day.status)}
                  onClick={() => setSelectedDate(day.date)}
                  className={dayClassName(day)}
                >
                  {day.date.split('.')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Calendar;
