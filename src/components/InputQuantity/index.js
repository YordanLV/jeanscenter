import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Input = styled.input`
  height: 3.6rem;
  padding-top: 0;
  padding-bottom: 0;
  padding: 1.1rem 1.2rem;
  text-align: center;
  color: #737780;
  background-color: #f7f7f7;
  background-image: none;
  border: 0.1rem solid #d0d2d4;
  font-size: 1.6rem;
  width: 6.2rem;
  cursor: not-allowed;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  height: 3.6rem;
  border-color: #ccc;
  background-color: #fff;
  text-align: center;
  vertical-align: middle;
  font-size: 2.2rem;
  width: 3rem;
  border: 0.1rem solid;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #f7f7f7;
    cursor: not-allowed;
  }
`;

const InputQuantity = ({ getValue, quantity, isCtaDisabled, increaseQuantity, decreaseQuantity, maxQuantity }) => {
  const [count, setCount] = useState(quantity);
  const [isMaxedQuantity, setIsMaxedQuantity] = useState(false);

  useEffect(() => {
    if (maxQuantity <= count) {
      setIsMaxedQuantity(true);
    }
  });

  const addOne = function () {
    increaseQuantity();
  };

  const substractOne = function () {
    decreaseQuantity();
  };

  return (
    <div css={{ display: 'flex' }}>
      <Button onClick={substractOne} disabled={isCtaDisabled || count === 1}>
        -
      </Button>
      <Input disabled type="number" name="quantity" value={count} />
      <Button onClick={addOne} disabled={isMaxedQuantity || isCtaDisabled}>
        +
      </Button>
    </div>
  );
};

InputQuantity.propTypes = {
  getValue: PropTypes.func,
  quantity: PropTypes.number || PropTypes.string,
  maxQuantity: PropTypes.number,
  increaseQuantity: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  isCtaDisabled: PropTypes.bool
};

export default InputQuantity;
