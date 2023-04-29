import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { PrivateRoute } from './Routes/PrivateRoute';
import { RedirectRoute } from './Routes/RedirectRoute';
import { useDispatch } from 'react-redux';
import { Layout } from '../Layout/Layout';
import { RestrictedRoute } from './Routes/RestrictedRoute';
import { lazy } from 'react';
import { Toastify } from '../Toast/Toast';
import { useAuth } from 'hooks/useAuth';
import { Loader } from '../Loader/Loader';

const Homepage = lazy(() => import('../../pages/Home/HomePage'));
const Register = lazy(() => import('../../pages/Register/RegisterPage'));
const Login = lazy(() => import('../../pages/Login/LoginPage.jsx'));
const Contacts = lazy(() => import('../../pages/Contacts/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toastify />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Register />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Login />} />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />

            <Route path="*" element={<RedirectRoute />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
