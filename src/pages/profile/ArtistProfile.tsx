import { memo } from 'react';
import Calendar from 'shared/components/Calendar';

import s from 'pages/profile/ArtistProfile.module.scss';
import { IArtistProfileData } from 'types/types';
import { createArtistCalendar } from 'utils/utils';
import { durationList } from 'constants/index';
import moment from 'moment';

const ArtistProfile = memo(() => {
  const profileData: IArtistProfileData = {
    weekend: [0, 6],
    recordAhead: 7,
    workingHours: ['8:0', '16:0'],
    breakHours: ['13:0', '14:0'],
    dateNow: `${moment().date()}.${moment().month()}`,
    proceduresList: [
      {
        categoryTitle: 'Маникюр',
        clientPhone: '+38(098)5869125',
        date: '29.2',
        startTime: '8:0',
        duration: durationList[5].duration,
      },
      {
        categoryTitle: 'Маникюр',
        clientPhone: '+38(098)5869125',
        date: '29.2',
        startTime: '11:0',
        duration: durationList[3].duration,
      },
      {
        categoryTitle: 'Маникюр',
        clientPhone: '+38(098)5869125',
        date: '29.2',
        startTime: '14:0',
        duration: durationList[3].duration,
      },
    ],
  };

  const calendarState = createArtistCalendar(profileData);
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Кабінет майстра</h1>
        <Calendar calendarState={calendarState} />
      </div>
    </div>
  );
});

export default ArtistProfile;
