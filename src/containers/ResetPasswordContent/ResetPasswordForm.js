import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { navigate } from '../../components/Navigate';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { Formik, Form } from 'formik';
import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import Button from '../../components/common/Button';
import Link from '../../components/Link';
import { passwordValidation } from '../../util/validations';

const ResetPasswordFormWrapper = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const ResetPasswordForm = ({ accountConfirmForgotPassword }) => {
  const SubmitButton = Button.withComponent('button');
  const [userEmail, setUserEmail] = useState('');
  const [urlCode, setUrlCode] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const paramsEmail = url.searchParams.get('email');
    const paramsConfirmationCode = url.searchParams.get('confirmationCode');
    setUserEmail(paramsEmail);
    setUrlCode(paramsConfirmationCode);
  });

  return (
    <ResetPasswordFormWrapper>
      <H1 css={{ fontFamily: 'Century Gothic W01', textTransform: 'uppercase' }}>{I18n('Password')}</H1>
      <Formik
        initialValues={{
          newPassword: '',
          confirmNewPassword: '',
          email: '',
          confirmationCode: ''
        }}
        validate={values => {
          let errors = {};
          if (!passwordValidation(values.newPassword)) {
            errors.newPassword = I18n(
              'Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number'
            );
          }
          if (!passwordValidation(values.confirmNewPassword)) {
            errors.confirmNewPassword = I18n(
              'Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number'
            );
          } else if (values.newPassword !== values.confirmNewPassword) {
            errors.confirmNewPassword = I18n('Password does not match');
          }
          return errors;
        }}
        onSubmit={async values => {
          values.email = userEmail;
          values.confirmationCode = urlCode;
          const result = await accountConfirmForgotPassword(values.email, values.confirmationCode, values.newPassword);
          if (result === undefined) {
            // BE return error 400
            navigate('/login/?resetPasswordSuccess=false');
            return;
          }

          if (result.statusCode === 200) {
            navigate('/login/?resetPasswordSuccess=true');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormiFormWrapper css={{ marginTop: '3rem' }}>
              <Row>
                <Col md="8">
                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField
                      id="newPassword"
                      fieldName="newPassword"
                      type="password"
                      label={I18n('New password *', true)}
                    />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField
                      id="confirmNewPassword"
                      fieldName="confirmNewPassword"
                      type="password"
                      label={I18n('Confirm new Password *', true)}
                    />
                  </Row>

                  <Row>
                    <Col md="8" css={{ marginBottom: '2rem' }}>
                      <Link to="/">
                        <Button bgColor="#5C616C" bgColorHover="#ee582a" color="#fff" css={{ marginRight: '1.6rem' }}>
                          {I18n('CANCEL')}
                        </Button>
                      </Link>
                      <SubmitButton
                        bgColorHover="#ee582a"
                        bgColor="#91c400"
                        color="#fff"
                        type="submit"
                        disabled={isSubmitting}
                      >
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
    </ResetPasswordFormWrapper>
  );
};

ResetPasswordForm.propTypes = {
  userData: PropTypes.object,
  changePassword: PropTypes.func,
  accountConfirmForgotPassword: PropTypes.func
};

export default ResetPasswordForm;
