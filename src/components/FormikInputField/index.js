import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import { Col } from 'reactstrap';

const FormikInputField = ({ label, fieldName, type, id, smLeft, smRight, leftOffset, isInputDisabled }) => {
  return (
    <>
      <Col sm={{ size: smLeft || '4', offset: leftOffset || 0 }}>
        <label htmlFor={id}>{label}</label>
      </Col>
      <Col sm={smRight || '8'}>
        <Field type={type || 'text'} name={fieldName} id={id} disabled={isInputDisabled} />
        <ErrorMessage name={fieldName} component="div" className="Error" />
      </Col>
    </>
  );
};

FormikInputField.propTypes = {
  label: PropTypes.string,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  smLeft: PropTypes.string,
  smRight: PropTypes.string,
  leftOffset: PropTypes.string,
  isInputDisabled: PropTypes.bool
};

export default FormikInputField;
