import { memo } from 'react';
import { getDateStatus, createSchedule, getMonthName, separateByMonths } from 'utils/utils';

import s from 'shared/components/Calendar.module.scss';

const Calendar = memo(() => {
  const schedule = createSchedule();
  const months = separateByMonths(schedule);
  const workingHours = ['8:00', '18:00']; //mock data

  return (
    <div className={s.wrapper}>
      {months.map((month) => (
        <div className={s.month} key={month[0].date}>
          <h4>{getMonthName(month[0])}</h4>
          <div className={s.calendar}>
            {month.map((day) => (
              <div className={s.day_wrapper} key={day.date}>
                {day.date && (
                  <span className={`${s.day} ${s[getDateStatus(day, workingHours)]}`}>
                    {day.date.split('.')[0]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Calendar;
