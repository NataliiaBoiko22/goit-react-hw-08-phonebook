
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  const userName = useSelector(authSelectors.selectUsername);
  const userEmail = useSelector(authSelectors.selectUserEmail);
  const isRefreshing = useSelector(authSelectors.selectIsRefreshing);

  return {
    isLoggedIn,
    userName,
    userEmail,
    isRefreshing,
  };
};
