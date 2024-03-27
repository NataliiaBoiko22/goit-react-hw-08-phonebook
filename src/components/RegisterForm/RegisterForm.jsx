import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import css from './registerForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (name === '' || email === '' || password === '') {
      toast.error('Please, fill in all fields');
      return;
    }

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        'Your password must contain at least one letter, one number, and one special character, and must not contain spaces'
      );
      return;
    }
    setValidated(true);

    dispatch(register({ name, email, password }));
  };
  return (
    <Form
      className={css.form}
      noValidate
      onSubmit={handleSubmit}
      validated={validated}
    >
      <h1 className={css.registerTitle}>Registration</h1>
      <Form.Group className="mb-3" controlId="formGroupName">
        <InputGroup>
          <InputGroup.Text>
            <FaUser size="20" />
          </InputGroup.Text>
          <FloatingLabel controlId="floatingName" label="Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              name="name"
            />
          </FloatingLabel>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <InputGroup>
          <InputGroup.Text>
            <MdEmail size="20" />
          </InputGroup.Text>
          <FloatingLabel controlId="floatingInput" label="Email address">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
            />
          </FloatingLabel>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <div>
          <InputGroup className={css.password}>
            <InputGroup.Text>
              <RiLockPasswordFill size="20" />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                className={css.formControlR}
                required
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={handleChange}
                name="password"
                minLength="8"
              />
            </FloatingLabel>
            <Button
              className={css.buttonPasswordR}
              variant="light"
              h="1.75rem"
              onClick={handleClick}
            >
              {show ? <GoEye size="20" /> : <GoEyeClosed size="20" />}
            </Button>
          </InputGroup>
        </div>
        <Form.Text className={css.passwordText} id="passwordHelpBlock" muted>
          Your password must be 8-15 characters, contain at least one letter,
          one number, and one special character, and must not contain spaces.
        </Form.Text>
      </Form.Group>
      <Button className={css.buttonSignUp} type="submit">
        Sign up
      </Button>
    </Form>
  );
};
