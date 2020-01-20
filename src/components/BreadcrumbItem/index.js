import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Link from '../Link';

const BreadcrumbItemWrapper = styled.div`
    position: relative;
    background-color: #fff;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    margin-right: 0.8rem;
    text-transform: uppercase;
    a {
      color: #a1a4aa; 
      &:hover {
        text-decoration: none;
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 100%;
        z-index: 1;
        content: " ";
        height: 0;
        width: 0;
        border: solid transparent;
        pointer-events: none;
        border-width: 13px;
        margin-top: -13px;
        border-left-color: #fff;
      }
      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        z-index: 0;
        content: " ";
        height: 0;
        width: 0;
        border: solid transparent;
        pointer-events: none;
        border-width: 13px;
        margin-top: -13px;
        border-left-color: #f7f7f7;
      }
    }
    &:first-of-type {
      padding-left: 1.2rem;
      a {
        &:before {
          opacity: 0;
        }
      }
    }
    &:last-of-type {
      padding-right: 1.2rem;
      pointer-events: none;
      a {
        color: #444a55;
        &:after {
          opacity: 0;
        }
      }
    }
`;

const BreadcrumbItem = ({ text, href }) => {
  return (
    <BreadcrumbItemWrapper>
      <Link to={href} title={text}>{text}</Link>
    </BreadcrumbItemWrapper>
  );
};

BreadcrumbItem.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};

export default BreadcrumbItem;
