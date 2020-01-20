import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const LogoWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  img {
    height:auto;
    width:100%;
    max-width: 225px;
  }
`;

const Logo = ({ src, alt, height }) => {
  return (
    <LogoWrapper>
      <Link to='/'>
        <img src={src} alt={alt} height={height} />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.number
};

export default Logo;
