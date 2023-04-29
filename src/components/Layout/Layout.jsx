import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../Header/AppBar/AppBar';
import Footer from '../Footer/Footer';
import css from './layout.module.css';

export const Layout = () => {
  return (
    <div className={css.box}>
      <AppBar />

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
