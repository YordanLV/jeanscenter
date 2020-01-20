import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';

const SnackbarWrapper = styled.div`
  position: fixed;
  z-index: ${ props => props.theme.zIndex.snackbar };
  left: 2rem;
  bottom: 2rem;
  min-width: 25rem;
  padding: 1rem 4rem 1rem 2rem;
  background-color: ${ props => props.backgroundColor || props.theme.color.mainGreen };
  color: #fff;
  font-size: 1.4rem;
  box-shadow: 0 0.3rem 0.5rem -1px rgba(0,0,0,0.2), 
              0 0.6rem 1rem 0 rgba(0,0,0,0.14),
              0 0.1rem 1.8rem 0 rgba(0,0,0,0.12);
  span {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    cursor: pointer;
  }
`;

const Snackbar = ({ message, isShown, backgroundColor }) => {
  const errorState = isShown ? 'flex' : 'none';

  useEffect(() => {
    document.addEventListener('click', snackbarHideLogic);
    function snackbarHideLogic (event) {
      const targetClass = event.target.getAttribute('data-element') || '';
      if (!targetClass.includes('snackbar')) {
        hideSnackbar();
      }
    }

    return () => {
      document.removeEventListener('click', snackbarHideLogic);
    };
  }, []);

  const hideSnackbar = () => {
    document.getElementsByClassName('snackbar')[0].style.display = 'none';
  };

  return (
    <SnackbarWrapper
      className="snackbar"
      data-element="snackbar"
      backgroundColor={backgroundColor}
      css={{ display: errorState }}>
      <div data-element="snackbar">{message || 'Default message'}</div>
      <span onClick={() => { hideSnackbar(); } }>X</span>
    </SnackbarWrapper>
  );
};

Snackbar.propTypes = {
  message: propTypes.string,
  isShown: propTypes.bool,
  backgroundColor: propTypes.string
};

export default Snackbar;
