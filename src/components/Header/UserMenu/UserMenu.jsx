import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { FiLogOut } from 'react-icons/fi';
import css from './userMenu.module.css';
import { FaUserAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

export const UserMenu = () => {
  const { userEmail, userName } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logOut());
  return (
    <div className={css.userMenuContainer}>
      <FaUserAlt className={css.userImage} alt={userName} />
      <p className={css.userName}>{userEmail}</p>
      <Button
        className={css.logOutBtn}
        type="button"
        onClick={handleLogout}
        variant="light"
      >
        <span className={css.logOutSpan}>Logout</span>
        <FiLogOut size="20" />
      </Button>
    </div>
  );
};
