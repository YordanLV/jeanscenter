import React, { useState } from 'react';
import propTypes from 'prop-types';
import Input from './Input';

const InputText = ({ placeholder, name, ...other }) => {
  const [inputVal, setInputVal] = useState('');

  const handleInputVal = event => {
    setInputVal(event.target.value);
  };

  return (
    <Input type='text' name={name} placeholder={placeholder} onChange={handleInputVal} {...other}/>
  );
};

InputText.propTypes = {
  placeholder: propTypes.string,
  name: propTypes.string,
  other: propTypes.any,
};

export default InputText;
