import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const AlertBoxWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  width: 100%;
  color: ${ props => props.isWarning ? '#8a6d3b' : props.isError ? '#a54445' : props.theme.color.mainGreen };
  background-color: ${ props => props.isWarning ? '#fcf8e3' : props.isError ? '#f1dede' : '#e3f0bf' };
  font-size: 1.6rem;
  text-transform: uppercase;
`;

const AlertBox = ({ text, isWarning, isError }) => {
  return (
    <AlertBoxWrapper isWarning={isWarning} isError={isError}>
      {text}
    </AlertBoxWrapper>
  );
};

AlertBox.propTypes = {
  text: PropTypes.string,
  isWarning: PropTypes.bool,
  isError: PropTypes.bool,
};

export default AlertBox;
