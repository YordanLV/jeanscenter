import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import { Formik, Form } from 'formik';

import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';
import AlertBox from '../../components/AlertBox';
import Button from '../../components/common/Button';
import Link from '../../components/Link';
import { passwordValidation } from '../../util/validations';

const UpdatePasswordWrapper = styled.div`
  font-size: 1.6rem;
`;

const UpdatePassword = ({ changePassword, isChangePasswordError, isChangePasswordSuccess, removeMyAccountAlerts }) => {
  const SubmitButton = Button.withComponent('button');
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  return (
    <UpdatePasswordWrapper>
      <H1 css={{ fontFamily: 'Century Gothic W01', textTransform: 'uppercase' }}>{I18n('Password')}</H1>
      {isChangePasswordSuccess && <AlertBox text={I18n('Password changed', true)} />}
      {isChangePasswordError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }}
        validate={values => {
          let errors = {};
          if (!passwordValidation(values.currentPassword)) {
            errors.currentPassword = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
          }
          if (!passwordValidation(values.newPassword)) {
            errors.newPassword = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
          }
          if (!passwordValidation(values.confirmNewPassword)) {
            errors.confirmNewPassword = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
          } else if (values.newPassword !== values.confirmNewPassword) {
            errors.confirmNewPassword = I18n('Password does not match');
          }
          return errors;
        }}
        onSubmit={values => {
          setIsBtnSubmitting(true);
          changePassword(values.currentPassword, values.newPassword);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            setIsBtnSubmitting(false);
            removeMyAccountAlerts();
          }, 3000);
        }}
      >
        {() => (
          <Form>
            <FormiFormWrapper css={{ marginTop: '3rem' }}>
              <Row>
                <Col md="8">
                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="currentPassword" fieldName="currentPassword" type="password" label={I18n('Current password *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="newPassword" fieldName="newPassword" type="password" label={I18n('New password *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField
                      id="confirmNewPassword"
                      fieldName="confirmNewPassword"
                      type="password"
                      label={I18n('Confirm new Password *', true)}
                    />
                  </Row>

                  <Row css={{ marginTop: '2rem' }}>
                    <Col md="8">
                      <Link to="/my-account/profile">
                        <Button bgColor="#5C616C" bgColorHover="#ee582a" color="#fff" css={{ marginRight: '1.6rem' }} onClick={removeMyAccountAlerts}>
                          {I18n('CANCEL')}
                        </Button>
                      </Link>
                      <SubmitButton bgColorHover="#ee582a" bgColor="#91c400" color="#fff" type="submit" disabled={isBtnSubmitting}>
                        {I18n('UPDATE')}
                      </SubmitButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormiFormWrapper>
          </Form>
        )}
      </Formik>
    </UpdatePasswordWrapper>
  );
};

UpdatePassword.propTypes = {
  userData: PropTypes.object,
  changePassword: PropTypes.func,
  isChangePasswordError: PropTypes.bool,
  isChangePasswordSuccess: PropTypes.bool,
  removeMyAccountAlerts: PropTypes.func
};

export default UpdatePassword;
