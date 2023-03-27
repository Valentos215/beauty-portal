import { memo } from 'react';
import Calendar from 'shared/components/Calendar';

import s from 'pages/profile/ArtistProfile.module.scss';
import { IArtistProfileData } from 'types/types';
import { createArtistCalendar, createSchedule } from 'utils/utils';

const ArtistProfile = memo(() => {
  const profileData: IArtistProfileData = {
    schedule: createSchedule(),
    proceduresList: [],
  };

  profileData.schedule[0].schedule = [
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
  profileData.schedule[3].schedule = [];

  const calendarState = createArtistCalendar(profileData.schedule);
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
