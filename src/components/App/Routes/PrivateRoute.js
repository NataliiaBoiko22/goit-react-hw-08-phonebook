import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shoudRedirect = !isLoggedIn && !isRefreshing;

  return shoudRedirect ? <Navigate to={redirectTo} /> : Component;
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType,
  redirectTo: PropTypes.string.isRequired,
};
