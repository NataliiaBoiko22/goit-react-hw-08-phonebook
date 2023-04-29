import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from 'redux/filter/filtersSlice';
import { selectFilterValue } from 'redux/contacts/selectors.js';
import css from './filter.module.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);
  return (
    <div className={css.filterWrapper}>
      <InputGroup className={css.inputGroup}>
        <InputGroup.Text>
          <BsSearch size="20" />
        </InputGroup.Text>
        <FloatingLabel
          className={css.floatingLabel}
          controlId="floatingInput"
          label="Find contact by name"
        >
          <Form.Control
            className={css.filterInput}
            type="text"
            placeholder="Enter email"
            value={filterValue}
            onChange={e => dispatch(filterContacts(e.currentTarget.value))}
          />
        </FloatingLabel>
      </InputGroup>
    </div>
  );
};
