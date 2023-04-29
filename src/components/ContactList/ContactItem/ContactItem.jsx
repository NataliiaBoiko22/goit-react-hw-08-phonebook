import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './contactItem.module.css';
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsPencilSquare } from 'react-icons/bs';
import { ModalContact } from 'components/Modal/Modal';
import Modal from 'react-bootstrap/Modal';
import { ContactFormEdit } from 'components/ContactFormEdit/ContactFormEdit';
import { DeleteConfirmationModal } from 'components/Modal/ModalConfirm';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const [show, setShow] = useState(false);
  const [deletingContactId, setDeletingContactId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={css.contactInfo}>
        <div className={css.name}>{name}</div> <div> {number}</div>
      </div>
      <div>
        <Button
          className={css.buttonStyle}
          type="button"
          onClick={() => handleShow()}
        >
          <BsPencilSquare />
        </Button>
        <Button
          className={css.buttonStyle}
          type="button"
          onClick={() => {
            setShowDeleteModal(true);
            setDeletingContactId(id);
          }}
        >
          <BsTrash3 />
        </Button>
      </div>
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContact
            title={'Edit contact'}
            component={ContactFormEdit}
            onClose={handleClose}
            id={id}
            userName={name}
            userNumber={number}
            isEdit={true}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          id={deletingContactId}
          name={name}
          onHide={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
