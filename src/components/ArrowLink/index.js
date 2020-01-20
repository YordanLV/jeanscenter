import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Link from '../Link';

const ArrowLinkStyled = styled.div`
  margin-bottom: ${ props => props.marginBot || '2.2rem' };
  font-size: 1.6rem;
  a {
    color: ${ props => props.theme.color.mainGray };
    text-decoration: none;
      &:hover {
      color: ${ props => props.theme.color.primaryHover };
      cursor: pointer;
  }
    &:before {
      content:  "\\e903";
      margin-right: 0.6rem;
      font-family: icomoon-jc!important;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }

`;

const ArrowLink = ({ marginBot, text, href }) => {
  return (
    <ArrowLinkStyled marginBot={marginBot}>
      <Link to={href}>{text}</Link>
    </ArrowLinkStyled>
  );
};

ArrowLink.propTypes = {
  text: PropTypes.string,
  marginBot: PropTypes.string,
  href: PropTypes.string,
};

export default ArrowLink;
