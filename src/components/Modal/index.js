import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Close from '../Close';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: ${ props => props.theme.zIndex.modal };
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const ModalBox = styled.div`
  z-index: ${ props => props.theme.zIndex.modal };
  overflow: auto;
  margin: auto;
  padding: 2rem 3rem;
  width: ${ props => props.width || '80%' };
  height: ${ props => props.height || '80%' };
  max-width: 80rem;
  min-width: 30rem;
  max-height: 60rem;
  min-height: 30rem;
  background: #fff;
  @media ${ props => props.theme.media.sm } {
    padding: 1rem 2rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 0.01rem solid #bfbfbf;
  .modal__title {
    align-self: center;
    margin-right: 1rem;
    font-family: 'Century Gothic W01 Bold', sans-serif;
    font-size: 1.6rem;
    text-transform: uppercase;
  }
`;

const Modal = ({ children, headerTitle, hideModal, width, height }) => {
  useEffect(() => {
    document.addEventListener('click', shouldHideModal);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    function shouldHideModal (event) {
      const targetClass = event.target.getAttribute('data-modal') || '';
      if (targetClass.includes('modalbox')) {
        (() => hideModal())();
      }
    }

    return () => {
      document.removeEventListener('click', shouldHideModal);
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalWrapper>
      <div css={{ display: 'flex', width: '100%;', height: '100%' }} data-modal="modalbox">
        <ModalBox width={width} height={height}>
          <ModalHeader>
            <div className="modal__title">{headerTitle}</div>
            <Close data-modal="modalbox" fontSize="1.7rem" padding="0.8rem 1.4rem" />
          </ModalHeader>
          {children}
        </ModalBox>
      </div>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.any,
  hideModal: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Modal;
