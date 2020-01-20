import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const SideNavWrapper = styled.div`
  margin-top: 1.5rem;
  a, span {
    display: block;
    margin-bottom: 0.3rem;
    color: ${ props => props.theme.color.mainGray };
    font-size: 1.6rem;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${ props => props.theme.color.primaryHover };
    }
  }
`;

const SideNav = ({ children }) => {
  return (
    <SideNavWrapper>
      {children}
    </SideNavWrapper>
  );
};

SideNav.propTypes = {
  children: PropTypes.array
};

export default SideNav;
