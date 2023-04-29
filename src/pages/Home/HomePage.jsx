import css from './homePage.module.css';

const HomePage = () => {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to</h1>
      <span className={css.phoneSpan}>
        Phone<span className={css.bookSpan}>book</span>
      </span>
      <p className={css.about}>
        The phone book allows you to store contacts and quickly search contacts
        by name
      </p>
    </main>
  );
};
export default HomePage;
