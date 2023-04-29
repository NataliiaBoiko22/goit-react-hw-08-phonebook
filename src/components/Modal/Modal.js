import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

export const ModalContact = ({
  title,
  component: Component,
  onClose,
  id,
  userName,
  userNumber,
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Component
          onClose={onClose}
          id={id}
          userName={userName}
          userNumber={userNumber}
        />
      </Modal.Body>
    </>
  );
};

ModalContact.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  userName: PropTypes.string,
  userNumber: PropTypes.string,
};
