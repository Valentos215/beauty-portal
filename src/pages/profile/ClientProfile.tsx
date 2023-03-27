import { memo } from 'react';
import Calendar from 'shared/components/Calendar';
import { IClientProfileData } from 'types/types';
import moment from 'moment';
import { durationList } from 'constants/index';

import s from 'pages/profile/ClientProfile.module.scss';
import { createClientCalendar } from 'utils/utils';

const ClientProfile = memo(() => {
  const profileData: IClientProfileData = {
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

  const calendarState = createClientCalendar(profileData);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Кабінет клієнта</h1>
        <Calendar calendarState={calendarState} />
      </div>
    </div>
  );
});

export default ClientProfile;
