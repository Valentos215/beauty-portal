import { memo, useState } from 'react';
import Calendar from 'pages/cabinet/calendar/Calendar';
import { IClientCabinetData } from 'types/types';
import moment from 'moment';
import { durationList } from 'constants/index';
import { createClientCalendar } from 'pages/cabinet/calendar/utils/calendar-utils';

import s from './ClientCabinet.module.scss';

const ClientCabinet = memo(() => {
  const [selectedDate, setSelectedDate] = useState(`${moment().date()}.${moment().month()}`);

  const clientCabinetData: IClientCabinetData = {
    proceduresList: [
      {
        categoryTitle: 'Маникюр',
        artistId: 'fvdf356fvd1df6vdf686',
        artistPhone: '+38(098)7878205',
        date: '28.2',
        startTime: '14:00',
        duration: durationList[3].duration,
      },
    ],
    dateNow: `${moment().date()}.${moment().month()}`,
  };

  const calendarState = createClientCalendar(clientCabinetData);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Кабінет клієнта</h1>
        <Calendar calendarState={calendarState} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
});

export default ClientCabinet;
