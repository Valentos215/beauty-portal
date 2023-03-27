import { memo } from 'react';
import Calendar from 'shared/components/Calendar';

import s from 'pages/profile/Profile.module.scss';

const Profile = memo(() => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <h1>Office</h1>
        <Calendar />
      </div>
    </div>
  );
});

export default Profile;
