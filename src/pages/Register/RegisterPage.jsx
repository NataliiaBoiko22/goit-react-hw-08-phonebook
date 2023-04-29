import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import css from './registerPage.module.css';
const Register = () => {
  return (
    <main className={css.regWrapper}>
      <RegisterForm />
    </main>
  );
};
export default Register;
