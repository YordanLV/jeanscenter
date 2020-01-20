import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Col } from 'reactstrap';

const FormikSelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: ${ props => props.width || '100%' };
  .select-wrapper:before {
    position: absolute;
    right: 2rem;
    top: 1.4rem;
    z-index: 1;
    font-family: icomoon-jc;
    font-size: 1.3rem;
    font-weight: 400;
    color: #737780;
    content: '\\e911';
  }
`;

const FormikSelectField = ({ children, label, id, selectedOption, smRight, name }) => {
  return (
    <FormikSelectWrapper>
      <Col sm="4">
        <label htmlFor={id}>{label}</label>
      </Col>
      <Col sm={smRight || '8'}>
        <div className="select-wrapper">
          <Field id={id} component="select" name={name} defaultValue={selectedOption}>
            {children}
          </Field>
        </div>
      </Col>
    </FormikSelectWrapper>
  );
};

FormikSelectField.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  id: PropTypes.string,
  selectedOption: PropTypes.string,
  smRight: PropTypes.string,
  name: PropTypes.string
};

export default FormikSelectField;
