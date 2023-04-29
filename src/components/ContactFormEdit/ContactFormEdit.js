import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import css from './contactFormEdit.module.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const ContactFormEdit = ({ onClose, id, userName, userNumber }) => {
  const { items } = useSelector(selectContacts);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(userName);
  const [number, setNumber] = useState(userNumber);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    console.log(value);
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    let isName = false;

    if (name === '' || number === '') {
      toast.error('Please, fill in all fields');
      return;
    }

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (items && items.length > 0) {
      items.forEach(({ name: existedName }) => {
        if (
          name.toLowerCase() === existedName.toLowerCase() &&
          name.toLowerCase() !== userName.toLowerCase()
        ) {
          toast.error(`${name} is already in contacts`);
          isName = true;
        }
      });
    }

    if (!isName) {
      dispatch(updateContact({ id, name, number }));
      onClose();
      setName('');
      setNumber('');
      setValidated(false);
    }
  };

  return (
    <Form
      className={css.formStyle}
      onSubmit={handleSubmit}
      validated={validated}
    >
      <Form.Group className="mb-3" controlId="formGroupName">
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            minLength="1"
            maxLength="20"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupNumber">
        <FloatingLabel
          controlId="floatingInput"
          label="Number"
          className="mb-3"
        >
          <Form.Control
            required
            type="tel"
            placeholder="Enter number"
            onChange={handleChange}
            name="number"
            value={number}
            pattern="[0-9()\-\s]+"
            minLength="5"
            maxLength="20"
          />
        </FloatingLabel>
      </Form.Group>
      <div className={css.buttonEditWrapper}>
        <Button className={css.buttonEdit} type="submit">
          Save changes
        </Button>
      </div>
    </Form>
  );
};

ContactFormEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userNumber: PropTypes.string.isRequired,
};
