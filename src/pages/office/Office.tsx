import { memo } from 'react';
import Calendar from 'shared/components/Calendar';

import s from 'pages/office/Office.module.scss';

const Office = memo(() => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Office</h1>
        <Calendar />
      </div>
    </div>
  );
});

export default Office;
