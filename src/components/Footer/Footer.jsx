import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div>
        <div className={css.copyright}>by Nataliia Boiko ©Phonebook 2023 </div>
      </div>
    </footer>
  );
};

export default Footer;
