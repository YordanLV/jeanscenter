import React from 'react';
import styled from '@emotion/styled';
import LoaderSVG from '../../../assets/loader.svg';

const StyledLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loader = () => {
  return (
    <StyledLoader>
      <LoaderSVG/>
    </StyledLoader>
  );
};

Loader.propTypes = {};

export default Loader;
