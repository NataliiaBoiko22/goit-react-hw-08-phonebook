import { LoginForm } from 'components/LoginForm/LoginForm';
import css from './loginPage.module.css';
const Login = () => {
  return (
    <main className={css.logWrapper}>
      <LoginForm />
    </main>
  );
};

export default Login;
