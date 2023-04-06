import { memo } from 'react';

import ArtistCabinet from './ArtistCabinet';
import ClientCabinet from './ClientCabinet';

import s from './Cabinet.module.scss';

const Cabinet = memo(() => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <ArtistCabinet />
      </div>
    </div>
  );
});

export default Cabinet;
