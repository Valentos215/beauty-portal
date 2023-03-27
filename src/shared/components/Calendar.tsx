import { memo } from 'react';
import { createSchedule, getMonthName, createCalendarState } from 'utils/utils';

import s from 'shared/components/Calendar.module.scss';
import { uaDays } from 'constants/index';

const Calendar = memo(() => {
  const schedule = createSchedule();
  schedule[2].schedule = [
    '8:0',
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
  ];
  schedule[3].schedule = [];
  const calendarState = createCalendarState(schedule);

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
                <span className={`${s.day} ${s[day.status]}`}>{day.date.split('.')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Calendar;
