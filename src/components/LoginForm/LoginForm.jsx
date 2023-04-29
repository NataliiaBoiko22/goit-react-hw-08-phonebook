import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { toast } from 'react-toastify';
import css from './loginForm.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
export const LoginForm = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
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
    if (email === '' || password === '') {
      toast.error('Please, fill in all fields');
      return;
    }
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };
  return (
    <Form
      className={css.form}
      noValidate
      onSubmit={handleSubmit}
      validated={validated}
    >
      <h1 className={css.loginTitle}>Login</h1>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <InputGroup>
          <InputGroup.Text>
            <MdEmail size="20" />
          </InputGroup.Text>
          <FloatingLabel controlId="floatingInput" label="Enter email">
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
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>
              <RiLockPasswordFill size="20" />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                required
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={handleChange}
                name="password"
                minLength="7"
              />
            </FloatingLabel>
            <Button
              className={css.buttonPasswordL}
              variant="light"
              h="1.75rem"
              onClick={handleClick}
            >
              {show ? <GoEye size="20" /> : <GoEyeClosed size="20" />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted className={css.textLogin}>
          Your password must be 8-15 characters, contain at least one letter,
          one number, and one special character, and must not contain spaces.
        </Form.Text>
      </Form.Group>
      <Button className={css.buttonLogin} type="submit">
        Log in
      </Button>
    </Form>
  );
};
