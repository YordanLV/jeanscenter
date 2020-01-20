import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const DropDownBoxWrapper = styled.div`
  position: absolute;
  border: 0.1rem solid ${ props => props.theme.color.silverGray || 'gray' };
  z-index: ${ props => props.theme.zIndex.fixed || 4 };
  right: 0.7rem;
  transform: translateY(100%);
  bottom: 0;
  color: black;
  background-color: white;
  cursor: initial;
  @media ${ props => props.theme.media.lg } {
    display: none;
  }
`;

const DropDownBox = ({ children }) => {
  return <DropDownBoxWrapper>{children}</DropDownBoxWrapper>;
};

DropDownBox.propTypes = {
  children: PropTypes.object
};

export default DropDownBox;
