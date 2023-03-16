import { memo } from 'react';
import { createSchedule, getMonthName, getMonths } from 'utils/utils';

import s from 'shared/components/Calendar.module.scss';

const Calendar = memo(() => {
  const schedule = createSchedule();
  const months = getMonths(schedule);

  return (
    <div className={s.wrapper}>
      {months.map((month) => (
        <div className={s.month}>
          <h4>{getMonthName(month[0])}</h4>
          <div className={s.calendar}>
            {month.map((day) => (
              <div className={s.calendar__day}>{day.date.split(':')[0]}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Calendar;
