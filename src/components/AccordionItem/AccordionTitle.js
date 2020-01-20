import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Link from '../../components/Link';
import H1 from '../common/H1';

const AccordionTitleWrapper = styled.div`
  text-transform: uppercase;
  margin-bottom: ${ prop => (prop.isActive ? '4rem' : '0') };
  pointer-events: none;
  a {
    display: flex;
    padding-bottom: ${ prop => (prop.isActive ? '2rem' : '0') };
    border-bottom: ${ prop => (prop.isActive ? '0.01rem solid #bfbfbf' : 'none') };
    text-decoration: none;
  }
  span {
    margin-right: 1.5rem;
    width: 3.2rem;
    height: 3.2rem;
    background: ${ prop => (prop.isActive ? prop.theme.color.mainGray : prop.isStepCompleted ? '#91c400' : '#a1a4aa') };
    color: #fff;
    font-size: 1.6rem;
    line-height: 3.2rem;
    font-weight: 600;
    text-align: center;
  }
  h1 {
    align-self: center;
    margin: 0;
    color: ${ prop => (prop.isActive ? prop.theme.color.mainGray : prop.isStepCompleted ? '#91c400' : '#a1a4aa') };
  }
`;

const AccordionTitle = ({ number, title, isActive, isStepCompleted }) => {
  return (
    <AccordionTitleWrapper isActive={isActive} isStepCompleted={isStepCompleted}>
      <Link to="#" title="">
        <span>{number}</span>
        <H1 fontSize="1.6rem">{title}</H1>
      </Link>
    </AccordionTitleWrapper>
  );
};

AccordionTitle.propTypes = {
  number: PropTypes.string || PropTypes.number,
  title: PropTypes.string,
  isActive: PropTypes.bool,
  isStepCompleted: PropTypes.bool
};

export default AccordionTitle;
