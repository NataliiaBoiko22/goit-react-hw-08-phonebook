import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './contactForm.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const ContactForm = ({ onClose }) => {
  const { items } = useSelector(selectContacts);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
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
        if (name.toLowerCase() === existedName.toLowerCase()) {
          toast.error(`${name} is already in contacts`);
          isName = true;
        }
      });
    }

    if (!isName) {
      dispatch(addContact({ name, number }));
      onClose();
      setName('');
      setNumber('');
      setValidated(false);
    }
  };

  return (
    <Form className={css.form} onSubmit={handleSubmit} validated={validated}>
      <Form.Group className="mb-3" controlId="formGroupName">
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            name="name"
            value={name}
            minLength="1"
            maxLength="20"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
      <Button className={css.buttonAdd} type="submit">
        Add contact
      </Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
