import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Loader } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { useEffect, useState } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { ModalContact } from 'components/Modal/Modal';
import Modal from 'react-bootstrap/Modal';
import { ContactForm } from 'components/ContactForm/ContactForm';
import css from './contacts.module.css';
const Contacts = () => {
  const { items, isLoading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <main className={css.sectionContacts}>
      <button className={css.buttonAdd} type="button" onClick={handleShow}>
        <IoMdPersonAdd className={css.addIcon} />{' '}
        <span className={css.newContacts}>New contact</span>
      </button>
      <Filter />
      {isLoading && <Loader />}
      {error && <div>Sorry, something went wrong :( Please try again</div>}
      {items.length > 0 && !isLoading && <ContactList />}
      {!isLoading && items.length === 0 && (
        <div className={css.noContacts}>There are any contacts yet</div>
      )}
      {show && (
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          onHide={handleClose}
        >
          <ModalContact
            title={'Add contact'}
            component={ContactForm}
            onClose={handleClose}
          />
        </Modal>
      )}
    </main>
  );
};

export default Contacts;
