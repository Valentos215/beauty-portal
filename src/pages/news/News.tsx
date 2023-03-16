import { memo } from 'react';

import s from 'pages/news/News.module.scss';

const Office = memo(() => {
  return (
    <div className={s.wrapper}>
      <h1>News</h1>
    </div>
  );
});

export default Office;
