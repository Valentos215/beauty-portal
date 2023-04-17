import { memo, useState } from 'react';
import Calendar from 'pages/cabinet/calendar/Calendar';

import { IArtistCabinetData } from 'types/types';
import { createArtistCalendar } from 'pages/cabinet/calendar/utils/calendar-utils';
import { createDayTimeline } from './timeline/utils/timeline-utils';
import { getDateTextFormat } from 'utils/utils';
import { durationList } from 'constants/index';
import moment from 'moment';

import s from './ArtistCabinet.module.scss';
import TimeLine from './timeline/TimeLine';

const ArtistCabinet = memo(() => {
  const [selectedDate, setSelectedDate] = useState(`${moment().date()}.${moment().month()}`);

  const artistCabinetData: IArtistCabinetData = {
    categories: [
      {
        categoryId: 'hdycgd6dcdi67',
        categoryTitle: 'Маникюр',
      },
      {
        categoryId: 'hdycgd446di67',
        categoryTitle: 'Педикюр',
      },
      {
        categoryId: 'ylycgd446di67',
        categoryTitle: 'Нарощування вій',
      },
    ],
    weekend: [0, 6],
    recordAhead: 7,
    workingHours: ['8:0', '16:0'],
    breakHours: ['13:0', '14:0'],
    dateNow: `${moment().date()}.${moment().month()}`,
    proceduresList: [
      {
        procedureId: 'hs7ddcdc78sdc9s',
        categoryTitle: 'Маникюр',
        clientName: 'Анна Волохацька',
        clientPhone: '+38(098)5869125',
        date: '17.3',
        startTime: '8:0',
        duration: durationList[3].duration,
        description: 'Френч без малюнку',
      },
      {
        procedureId: 'hs7ddcdc78s589s',
        categoryTitle: '',
        clientName: 'Яна',
        clientPhone: '',
        date: '17.3',
        startTime: '10:0',
        duration: durationList[0].duration,
        description: 'Поправити кути',
      },
      {
        procedureId: 'hs9ddcdc78sdc9s',
        categoryTitle: 'Маникюр',
        clientName: 'Анна Волохацька',
        clientPhone: '+38(098)5869125',
        date: '17.3',
        startTime: '11:0',
        duration: durationList[3].duration,
        description: 'Френч',
      },
      {
        procedureId: 'hs8ddcdc78sdc9s',
        categoryTitle: 'Маникюр',
        clientName: 'Анна Волохацька',
        clientPhone: '+38(098)5869125',
        date: '17.3',
        startTime: '14:0',
        duration: durationList[2].duration,
        description: 'Щось з цікавим принтом і блістками',
      },
    ],
  };

  const dayTimeline = createDayTimeline(artistCabinetData, selectedDate);
  const calendarState = createArtistCalendar(artistCabinetData);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Кабінет майстра</h1>
        <div className={s.row}>
          <Calendar calendarState={calendarState} setSelectedDate={setSelectedDate} />
          <div className={s.right_column}>
            <h2>Розклад на {getDateTextFormat(selectedDate)}</h2>
            <TimeLine dayTimeline={dayTimeline} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ArtistCabinet;
