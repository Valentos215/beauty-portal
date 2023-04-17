import { memo } from 'react';

import s from './TimeLine.module.scss';
import { ITimeLine } from 'types/types';
import Show from 'shared/components/show/Show';
import { getTimeFormat } from 'utils/utils';

interface ITimeLineProps {
  dayTimeline: ITimeLine[];
}
const TimeLine = memo(({ dayTimeline }: ITimeLineProps) => {
  return (
    <div className={s.wrapper}>
      {dayTimeline.map((timeLine) => (
        <div className={`${s.slot} ${s[timeLine.timeStatus]}`} key={timeLine.startTime}>
          <div className={s.slot_time}>
            <span>
              {getTimeFormat(timeLine.startTime)} - {getTimeFormat(timeLine.endTime)}
            </span>
          </div>
          <div className={s.slot_card}>
            <h4 className={s.slot_card__title}>{timeLine.title}</h4>
            <Show condition={!!timeLine.clientName}>
              <div className={s.slot_card__client}>
                <span>{timeLine.clientName}</span>
                <Show condition={!!timeLine.clientPhone}>
                  <span>тел.: {timeLine.clientPhone}</span>
                </Show>
              </div>
            </Show>
            <Show condition={!!timeLine.description}>
              <div className={s.slot_card__description}>{timeLine.description}</div>
            </Show>
          </div>
        </div>
      ))}
    </div>
  );
});

export default TimeLine;
