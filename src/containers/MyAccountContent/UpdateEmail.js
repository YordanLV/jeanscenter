import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import { Formik, Form } from 'formik';

import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';
import Button from '../../components/common/Button';
import Link from '../../components/Link';
import AlertBox from '../../components/AlertBox';
import { validateEmail, passwordValidation } from '../../util/validations';

const UpdateEmailWrapper = styled.div`
  font-size: 1.6rem;
`;

const UpdateEmail = ({ userData, changeEmailAddress, isChangeEmailSuccess, isChangeEmaildError, removeMyAccountAlerts }) => {
  const previusEmail = userData.email;
  const SubmitButton = Button.withComponent('button');
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  return (
    <UpdateEmailWrapper>
      <H1 css={{ fontFamily: 'Century Gothic W01', textTransform: 'uppercase' }}>{I18n('E-mail address')}</H1>
      {isChangeEmailSuccess && <AlertBox text={I18n('Email changed', true)} />}
      {isChangeEmaildError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
      <Formik
        initialValues={{
          newEmail: userData.email,
          confirmNewEmail: '',
          password: ''
        }}
        validate={values => {
          let errors = {};
          if (previusEmail === values.newEmail) {
            errors.newEmail = I18n('Enter new email');
          } else if (!validateEmail(values.newEmail)) {
            errors.newEmail = I18n('Invalid email address');
          } else if (values.newEmail !== values.confirmNewEmail) {
            errors.confirmNewEmail = I18n('Emails dont match');
          }
          if (!validateEmail(values.confirmNewEmail)) {
            errors.confirmNewEmail = I18n('Invalid email address');
          }
          if (!passwordValidation(values.password)) {
            // eslint-disable-next-line max-len
            errors.password = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
          }
          return errors;
        }}
        onSubmit={values => {
          setIsBtnSubmitting(true);
          changeEmailAddress(values.newEmail, values.password);
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
                    <FormikInputField id="newEmail" fieldName="newEmail" label={I18n('New email address *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="confirmNewEmail" fieldName="confirmNewEmail" label={I18n('Confirm new email address *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="password" fieldName="password" type="password" label={I18n('Password *', true)} />
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
    </UpdateEmailWrapper>
  );
};

UpdateEmail.propTypes = {
  userData: PropTypes.object,
  changeEmailAddress: PropTypes.func,
  isChangeEmaildError: PropTypes.bool,
  isChangeEmailSuccess: PropTypes.bool,
  removeMyAccountAlerts: PropTypes.func
};

export default UpdateEmail;
