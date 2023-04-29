import { NavLink } from 'react-router-dom';

import css from './authNav.module.css';

export const AuthNav = () => {
  const activeLink = ({ isActive }) =>
    isActive ? `${css.navlink} ${css.activeLink}` : css.navlink;
  return (
    <div className={css.navlist}>
      <NavLink className={activeLink} to="/register">
        Register
      </NavLink>
      <NavLink className={activeLink} to="login">
        Login
      </NavLink>
    </div>
  );
};
