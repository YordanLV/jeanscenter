import React from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from '../../components/common/Button';
import { validateEmail } from '../../util/validations';

const CheckoutCheckEmailWrapper = styled.div`
  label {
    font-size: 1.6rem;
  }
  input {
    vertical-align: top;
    padding: 1.1rem 1.2rem;
    height: 4.6rem;
    outline: none;
    font-size: 1.6rem;
    width: 100%;
  }
`;

const CheckoutCheckEmail = ({ checkIfUserExists, getEmailForCheckValue }) => {
  const SubmitButton = Button.withComponent('button');

  const checkUserEmail = email => {
    checkIfUserExists(email);
  };

  return (
    <CheckoutCheckEmailWrapper>
      <Row>
        <Col sm="12" css={{ fontSize: '1.6rem', marginBottom: '2.2rem' }}>
          {I18n('Met jouw emailadres checken we of je al vaker online iets gekocht hebt, zo kun je zo snel mogelijk het afrekenproces door.')}
        </Col>
        <Col sm="12">
          <Formik
            initialValues={{
              email: ''
            }}
            validate={values => {
              let errors = {};
              if (!validateEmail(values.email)) {
                errors.email = I18n('Invalid email address');
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await getEmailForCheckValue(values.email);
              await checkUserEmail(values.email);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col sm="12">
                    <Row>
                      <Col sm="4" css={{ alignSelf: 'center' }}>
                        <label htmlFor="email">{I18n('E-mail address *', true)}</label>
                      </Col>
                      <Col sm="8">
                        <Field type="text" name="email" id="email" />
                      </Col>
                      <Col sm="12">
                        <ErrorMessage name="email" component="div" className="Error" css={{ textAlign: 'right', fontSize: '1.4rem' }} />
                      </Col>
                      <Col sm="12" css={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <SubmitButton bgColorHover="#ee582a" bgColor="#91c400" color="#fff" type="submit" disabled={isSubmitting}>
                          {I18n('Next One')}
                        </SubmitButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </CheckoutCheckEmailWrapper>
  );
};

CheckoutCheckEmail.propTypes = {
  checkIfUserExists: PropTypes.func,
  getEmailForCheckValue: PropTypes.func
};

export default CheckoutCheckEmail;
