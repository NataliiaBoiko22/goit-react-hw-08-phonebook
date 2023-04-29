import { useAuth } from 'hooks/useAuth';
import css from './navigation.module.css';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const activeLink = ({ isActive }) =>
    isActive ? `${css.link} ${css.activeLink}` : css.link;
  return (
    <ul className={css.navList}>
      <NavLink className={activeLink} to="/">
        Homepage
      </NavLink>
      {isLoggedIn && (
        <NavLink className={activeLink} to="/contacts">
          Contacts
        </NavLink>
      )}
    </ul>
  );
};
