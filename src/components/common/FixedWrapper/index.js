import React from "react";

import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ReservedPadding = styled.div`
  padding-top: 17.5rem;
  @media ${props => props.theme.media.xl} {
    padding-top: 19.5rem;
  }
  @media ${props => props.theme.media.lg} {
    padding-top: 15.5rem;
  }
  @media ${props => props.theme.media.md} {
    padding-top: 14.5rem;
  }
`;

const Fixed = styled.div`
  position: fixed;
  z-index: ${props => props.theme.zIndex.fixed || 2};
  top: 0;
  width: 100%;
`;

const FixedWrapper = ({ children }) => {
  return (
    <>
      <ReservedPadding />
      <Fixed>{children}</Fixed>
    </>
  );
};

FixedWrapper.propTypes = {
  children: PropTypes.array
};

export default FixedWrapper;
