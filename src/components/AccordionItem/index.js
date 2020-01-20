import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import AccordionTitle from './AccordionTitle';

const AccordionItemWrapper = styled.div`
  margin-bottom: 1.6rem;
  padding: 2rem 4rem;
  background: ${ prop => prop.isStepCompleted ? '#e3f0bf' : '#fff' };
  @media ${ props => props.theme.media.lg }{
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
`;

const AccordionItem = ({ children, isActive, number, title, isStepCompleted }) => {
  return (
    <AccordionItemWrapper isStepCompleted={isStepCompleted}>
      <AccordionTitle number={number} title={title} isActive={isActive} isStepCompleted={isStepCompleted}/>
      {children}
    </AccordionItemWrapper>
  );
};

AccordionItem.propTypes = {
  children: PropTypes.any,
  isActive: PropTypes.bool,
  number: PropTypes.string || PropTypes.number,
  title: PropTypes.string,
  isStepCompleted: PropTypes.bool,
};

export default AccordionItem;
