import { memo, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from 'assets/logo.svg';
import ExpandedMenu from 'components/header/expandedMenu/ExpandedMenu';
import { ExpandContext } from 'contexts/expandContext';
import { ERouterLink, NAV_MENU } from 'constants/index';

import s from 'components/header/Header.module.scss';

const Header = memo(() => {
  const [expanded, setExpanded] = useContext(ExpandContext);

  const burgerClassName = expanded ? `${s.burger} ${s.active}` : s.burger;

  return (
    <>
      <ExpandedMenu expanded={expanded} setExpanded={setExpanded} />
      <div className={s.header}>
        <div className="container">
          <div className={s.header__wrapper}>
            <Link
              to={ERouterLink.Root}
              className={s.header__logo}
              onClick={() => setExpanded(false)}
            >
              <img alt="" src={`${logo}`} />
            </Link>
            <div className={s.nav}>
              {NAV_MENU.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.link}
                  className={s.nav__link}
                  activeClassName={s.active}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
            <div className={s.right_column}>
              <div className={burgerClassName} onClick={() => setExpanded(!expanded)}>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
