import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ArrowTextStyled = styled.div`
  margin-bottom: ${ props => props.marginBot || '3.2rem' };
  font-size: 1.6rem;
  &:hover{
    color: ${ props => props.theme.color.primaryHover };
    cursor: pointer;
  }
  &:before {
    content:  "\\${ props => (props.isLeftArrow ? 'e908' : 'e903') }";
    margin-right: 1rem;
    font-family: icomoon-jc!important;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const ArrowText = ({ isLeftArrow, marginBot, toggleVisibility, text }) => {
  return (
    <ArrowTextStyled isLeftArrow={isLeftArrow} marginBot={marginBot} onClick={toggleVisibility}>
      {text}
    </ArrowTextStyled>
  );
};

ArrowText.propTypes = {
  text: PropTypes.string,
  isLeftArrow: PropTypes.bool,
  marginBot: PropTypes.string,
  ToggleVisibility: PropTypes.func
};

export default ArrowText;
