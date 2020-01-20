import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const SelectWrapper = styled.div`
  position: relative;
  width: ${ props => props.width || '100%' };
  &:before {
    position: absolute;
    right: 1rem;
    top: 1.4rem;
    font-family: icomoon-jc;
    font-size: 1.3rem;
    font-weight: 400;
    color: #737780;
    content: '\\e911';
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  outline: none;
  padding: 1.1rem 1.2rem;
  width: 100%;
  height: 4.6rem;
  background: #fff;
  border: ${ props => props.errorMessage ? '0.1rem solid #a94442' : '0.1rem solid #EEEEEE' } ;
  border-radius: 0;
  &:focus {
    border: 0.1rem solid #5c616b;
  }
`;

const Select = ({ children, width, getInputVal, validate, id, errorMessage, selectedOption }) => {
  const [selectVal, setSelectVal] = useState('');

  const handleSelectVal = event => {
    setSelectVal(event.currentTarget.value);
    getInputVal && getInputVal(id, event.currentTarget.value, validate());
  };

  return (
    <SelectWrapper width={width}>
      <StyledSelect onChange={handleSelectVal} errorMessage={errorMessage} defaultValue={selectedOption}>
        {children}
      </StyledSelect>
      {errorMessage && <div css={{ color: '#a94442', marginTop: '0.5rem', marginBottom: '1rem' }}>{errorMessage}</div>}
    </SelectWrapper>
  );
};

Select.propTypes = {
  children: PropTypes.any,
  width: PropTypes.string,
  getInputVal: PropTypes.func,
  validate: PropTypes.func,
  id: PropTypes.string,
  errorMessage: PropTypes.object || PropTypes.string,
  selectedOption: PropTypes.string,
};

export default Select;
