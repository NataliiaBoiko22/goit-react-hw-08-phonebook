import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { deleteContact } from 'redux/contacts/operations';

export const DeleteConfirmationModal = ({ id, name, onHide }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
    onHide();
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete a contact "{name}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteConfirmationModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};
