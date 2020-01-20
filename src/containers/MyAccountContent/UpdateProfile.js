import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import { Formik, Form } from 'formik';

import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';
import FormikSelectField from '../../components/FormikSelectField';
import AlertBox from '../../components/AlertBox';
import Button from '../../components/common/Button';
import Link from '../../components/Link';
import localstorate from '../../util/localstorage';
import { nameValidation } from '../../util/validations';

const UpdateProfileWrapper = styled.div`
  font-size: 1.6rem;
`;

const UpdateProfile = ({ userData, updateUser, isUpdateProfileError, isUpdateProfileSuccess, removeMyAccountAlerts }) => {
  const SubmitButton = Button.withComponent('button');
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  return (
    <UpdateProfileWrapper>
      <H1 css={{ fontFamily: 'Century Gothic W01' }}>{I18n('PERSONAL DATA')}</H1>
      <Formik
        initialValues={{
          gender: userData.gender,
          firstName: userData.name,
          middleName: userData.insertion,
          lastName: userData.familyName
        }}
        validate={values => {
          let errors = {};
          if (!nameValidation(values.firstName)) {
            errors.firstName = I18n('Enter your first name here');
          }
          if (!nameValidation(values.lastName)) {
            errors.lastName = I18n('Enter your last name here');
          }
          return errors;
        }}
        onSubmit={async values => {
          setIsBtnSubmitting(true);
          await updateUser(values.gender, values.firstName, values.middleName, values.lastName);

          localstorate.setItem('name', values.firstName);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            setIsBtnSubmitting(false);
            removeMyAccountAlerts();
          }, 3000);
        }}
      >
        {value => (
          <Form>
            <FormiFormWrapper css={{ marginTop: '3rem' }}>
              {isUpdateProfileSuccess && <AlertBox text={I18n('Address updated', true)} />}
              {isUpdateProfileError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
              <Row>
                <Col md="8">
                  <Row css={{ marginBottom: '2rem' }}>
                    <FormikSelectField id="gender" name="gender" label={I18n('Sex *', true)} selectedOption={value.initialValues.gender}>
                      <option value="MALE">{I18n('MALE', true)}</option>
                      <option value="FEMALE">{I18n('FEMALE', true)}</option>
                    </FormikSelectField>
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="firstName" fieldName="firstName" label={I18n('First Name *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="middleName" fieldName="middleName" label={I18n('Tussenvoegsel', true)} inputMaxWith="8rem" />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="lastName" fieldName="lastName" label={I18n('Last name *', true)} />
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
    </UpdateProfileWrapper>
  );
};

UpdateProfile.propTypes = {
  userData: PropTypes.object,
  updateUser: PropTypes.func,
  isUpdateProfileError: PropTypes.bool,
  isUpdateProfileSuccess: PropTypes.bool,
  removeMyAccountAlerts: PropTypes.func
};

export default UpdateProfile;
