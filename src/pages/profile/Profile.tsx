import { memo } from 'react';

import ArtistProfile from './ArtistProfile';
import ClientProfile from './ClientProfile';

import s from 'pages/profile/Profile.module.scss';

const Profile = memo(() => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <ArtistProfile />
      </div>
    </div>
  );
});

export default Profile;
