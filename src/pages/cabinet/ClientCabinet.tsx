import { memo } from 'react';
import Calendar from 'shared/components/Calendar';
import { IClientCabinetData } from 'types/types';
import moment from 'moment';
import { durationList } from 'constants/index';

import s from 'pages/cabinet/ClientCabinet.module.scss';
import { createClientCalendar } from 'utils/utils';

const ClientCabinet = memo(() => {
  const cabinetData: IClientCabinetData = {
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

  const calendarState = createClientCalendar(cabinetData);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Кабінет клієнта</h1>
        <Calendar calendarState={calendarState} />
      </div>
    </div>
  );
});

export default ClientCabinet;
