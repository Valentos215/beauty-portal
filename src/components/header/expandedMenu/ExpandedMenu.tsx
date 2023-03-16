import { NAV_MENU } from 'constants/index';
import { memo } from 'react';

import { Link } from 'react-router-dom';

import s from './ExpandedMenu.module.scss';
interface IExpandMenuProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const ExpandedMenu = memo(({ expanded, setExpanded }: IExpandMenuProps) => {
  const menuClassName = expanded ? `${s.menu} ${s.expanded}` : s.menu;

  return (
    <div className={menuClassName} onClick={() => setExpanded(false)}>
      <div className={s.menu__items}>
        {NAV_MENU.map((item) => (
          <Link to={item.link} className={s.item} key={item.title}>
            <div className={s.item__wrapper}>
              <img src={item.logo} alt=""></img>
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default ExpandedMenu;
