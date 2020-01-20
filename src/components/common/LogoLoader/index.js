import React from "react";

import styled from "@emotion/styled";
import PropTypes from "prop-types";
import logo from "../../../images/jc-loader.gif";

const LogoMask = styled.div`
  z-index: ${props => props.theme.zIndex.fixed};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : "rgba(0, 0, 0, 0.7)"};
  &:after {
    background: url(${props => props.logo}) no-repeat;
    content: "";
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 10.2rem;
    height: 7.4rem;
  }
`;

const LogoLoader = ({ backgroundColor }) => {
  return <LogoMask logo={logo} backgroundColor={backgroundColor} />;
};

LogoLoader.propTypes = {
  backgroundColor: PropTypes.string
};

export default LogoLoader;
