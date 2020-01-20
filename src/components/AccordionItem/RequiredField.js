import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import Input from '../common/InputText/Input';

const RequiredField = ({
  id, errorMessage, labelText, getInputVal, validate, sm1, sm2, type, disabled = false, enteredEmail
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const handleInputVal = event => {
    setInputVal(event.target.value);
  };
  const disableAutoCompleteHACK = 'new-password';

  useEffect(() => {
    validate && setIsValidated(validate(inputVal));
    getInputVal && getInputVal(id, inputVal, isValidated);
  }, [inputVal, isValidated]);

  return (
    <>
      <Col sm={sm1 || '4'} css={{ display: 'flex' }}>
        <label htmlFor={id} css={{ color: !isValidated && errorMessage ? '#a94442' : 'inherit' }}>{labelText}</label>
      </Col>
      <Col sm={sm2 || '8'}>
        <Input
          type={ type || 'text' }
          autoComplete={disableAutoCompleteHACK}
          id={id}
          onChange={handleInputVal}
          css={{ border: !isValidated && errorMessage ? '1px solid #a94442' : '1px solid #EEEEEE' }}
          value={inputVal || enteredEmail}
          disabled={disabled}
        />

        {!isValidated && errorMessage &&
          <div css={{ color: '#a94442', marginTop: '0.5rem', marginBottom: '1rem' }}>
            {errorMessage}
          </div>}
      </Col>
    </>
  );
};

RequiredField.propTypes = {
  id: PropTypes.string,
  errorMessage: PropTypes.object || PropTypes.string,
  labelText: PropTypes.object || PropTypes.string,
  getInputVal: PropTypes.func,
  validate: PropTypes.func,
  sm1: PropTypes.string,
  sm2: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  enteredEmail: PropTypes.string,
};

export default RequiredField;
