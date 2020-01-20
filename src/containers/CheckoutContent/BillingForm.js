import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Formik, Form, ErrorMessage } from 'formik';

import { I18n } from '../../i18n';
import FormikSelectField from '../../components/FormikSelectField';
import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';
import Button from '../../components/common/Button';
import HR from '../../components/common/HR';
import BillingFormWrapper from './BilingFromWrapper';
import { LocaleContext } from '../../layout';

import {
  nameValidation,
  onlyDigitsWithExactLength,
  checkLength,
  telephoneValidation,
  onlyDigitsMaxLength,
  passwordValidation
} from '../../util/validations';

const BillingForm = ({
  explainText,
  userData,
  addBillingInformation,
  isCtaDisabled,
  checkedEmail,
  notRegisteredEmail,
  registerAndAddBillingInformation
}) => {
  const SubmitButton = Button.withComponent('button');
  // registration is active
  const [isCreateAccActive, setIsCreateAccActive] = useState(notRegisteredEmail);

  const getRadioValue = e => {
    const radioButtonValue = e.target.value;
    radioButtonValue === 'active' ? setIsCreateAccActive(true) : setIsCreateAccActive(false);
  };

  return (
    <LocaleContext.Consumer>
      {context => (
        <BillingFormWrapper>
          {explainText && <div css={{ marginBottom: '2.2rem', fontSize: '1.6rem', lineHeight: '1.6' }}>{explainText}</div>}
          <Formik
            initialValues={{
              country: 'BE',
              gender: (userData.address && userData.address.gender) || 'select',
              firstName: (userData.address && userData.address.name) || '',
              middleName: (userData.address && userData.address.insertion) || '',
              lastName: (userData.address && userData.address.familyName) || '',
              postCode: (userData.address && userData.address.postalCode) || '',
              streetName: (userData.address && userData.address.streetName) || '',
              streetNumber: (userData.address && userData.address.houseNumber) || '',
              additionalStreetInfo: (userData.address && userData.address.addition) || '',
              city: (userData.address && userData.address.city) || '',
              telNum: (userData.address && userData.address.phoneNumber) || '',
              email: checkedEmail || userData.email || '',
              password: '',
              confirmPassword: ''
            }}
            validate={values => {
              let errors = {};

              if (values.gender === 'select') {
                errors.gender = I18n('Select a gender');
              }

              if (!nameValidation(values.firstName)) {
                errors.firstName = I18n('Enter your first name here');
              }

              if (!nameValidation(values.lastName)) {
                errors.lastName = I18n('Enter your last name here');
              }

              if (!onlyDigitsWithExactLength(values.postCode)) {
                errors.postCode = I18n('Enter a correct zip code');
              }

              if (!onlyDigitsMaxLength(values.streetNumber)) {
                errors.streetNumber = I18n('Enter your street number');
              }

              if (!checkLength(values.streetName)) {
                errors.streetName = I18n('Enter your street name here');
              }

              if (!checkLength(values.city)) {
                errors.city = I18n('Enter your location here');
              }

              if (!telephoneValidation(values.telNum)) {
                errors.telNum = I18n('Enter valid telephone number');
              }

              if (!passwordValidation(values.password) && isCreateAccActive) {
                errors.password = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
              }

              if (!passwordValidation(values.confirmPassword) && isCreateAccActive) {
                errors.confirmPassword = I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number');
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = I18n('Password does not match');
              }

              // if the user doesnt want to register remove the values
              if (!isCreateAccActive) {
                delete values['password'];
                delete values['confirmPassword'];
              }

              return errors;
            }}
            onSubmit={values => {
              // user want to create account
              if (isCreateAccActive) {
                registerAndAddBillingInformation({ preferredLanguage: context.preferredLanguage, ...values });
              } else {
                // user doesnt want to create account make standard call
                addBillingInformation(values);
              }
            }}
          >
            {values => (
              <Form>
                <FormiFormWrapper css={{ marginTop: '3rem' }}>
                  <Row>
                    <Col sm="12">
                      {/* COUNTRY */}
                      <Row css={{ marginBottom: '2rem' }}>
                        <FormikSelectField id="country" label={I18n('Country *', true)} smRight="4">
                          <option value="BE">{I18n('Belgium', true)}</option>
                        </FormikSelectField>
                      </Row>

                      {/* Gender */}
                      <Row css={{ marginBottom: '2rem' }}>
                        <FormikSelectField
                          id="gender"
                          label={I18n('Sex *', true)}
                          name="gender"
                          smRight="4"
                          selectedOption={values.initialValues.gender}
                        >
                          <option disabled value="select">
                            {I18n('Select', true)}
                          </option>
                          <option value="MALE">{I18n('Male', true)}</option>
                          <option value="FEMALE">{I18n('Female', true)}</option>
                        </FormikSelectField>
                        <Col sm={{ size: '4', offset: '4' }}>
                          <ErrorMessage name="gender" component="div" className="Error" css={{ textAlign: 'right' }} />
                        </Col>
                      </Row>

                      {/* First Name */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="firstName" fieldName="firstName" label={I18n('First Name *', true)} />
                      </Row>

                      {/* Tussen */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="middleName" fieldName="middleName" smRight="2" label={I18n('Tussenvoegsel', true)} />
                      </Row>

                      {/* Last Name */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="lastName" fieldName="lastName" label={I18n('Last name *', true)} />
                      </Row>

                      {/* Postcode */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="postCode" fieldName="postCode" smRight="2" label={I18n('Postcode *', true)} />
                      </Row>

                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        {/* Street num */}
                        <FormikInputField id="streetNumber" fieldName="streetNumber" smLeft="4" smRight="2" label={I18n('Street number *', true)} />
                        {/* Toev */}
                        <FormikInputField
                          id="additionalStreetInfo"
                          fieldName="additionalStreetInfo"
                          smLeft="2"
                          smRight="2"
                          leftOffset="2"
                          label={I18n('Toevoeging', true)}
                          css={{ paddingLeft: '3rem' }}
                        />
                      </Row>

                      {/* Str Name */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="streetName" fieldName="streetName" label={I18n('Street name *', true)} />
                      </Row>

                      {/* City */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="city" fieldName="city" label={I18n('City *', true)} />
                      </Row>

                      {/* Tel num */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="telNum" fieldName="telNum" label={I18n('Telephone number *', true)} />
                      </Row>

                      {/* Email addr */}
                      <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <FormikInputField id="email" fieldName="email" isInputDisabled={true} label={I18n('E-mail address *', true)} />
                      </Row>

                      {notRegisteredEmail && (
                        <>
                          <div css={{ fontFamily: 'Century Gothic W01 Bold', fontSize: '1.6rem', marginBottom: '1rem', marginTop: '2rem' }}>
                            {I18n('TIP')}
                          </div>
                          <div>{I18n('Met een Jeans Centre account kun je de volgende keer sneller en makkelijker bestellen.')}</div>
                          <HR />
                          <div className="radio-wrapper">
                            <input
                              id="registration-radio"
                              type="radio"
                              name="passwordRadio"
                              value="active"
                              checked={isCreateAccActive}
                              onChange={getRadioValue}
                            />
                            <label htmlFor="registration-radio">{I18n('Account aanmaken')}</label>
                          </div>
                          {isCreateAccActive && (
                            <>
                              {/* Password */}
                              <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3rem' }} className="register-password">
                                <FormikInputField
                                  id="password"
                                  fieldName="password"
                                  type="password"
                                  smLeft="12"
                                  smRight="4"
                                  autocomplete="new-password"
                                  label={I18n('Password *', true)}
                                />
                              </Row>

                              {/* Confirm Password */}
                              <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }} className="register-password">
                                <FormikInputField
                                  id="confirmPassword"
                                  fieldName="confirmPassword"
                                  type="password"
                                  smLeft="12"
                                  smRight="4"
                                  autocomplete="new-password"
                                  label={I18n('Confirm password *', true)}
                                />
                              </Row>
                            </>
                          )}
                          <div className="radio-wrapper">
                            <input id="no-registration-radio" type="radio" name="passwordRadio" value="inactive" onChange={getRadioValue} />
                            <label htmlFor="no-registration-radio">{I18n('Bestellen zonder account')}</label>
                          </div>
                        </>
                      )}

                      <Row>
                        <Col sm="12" css={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                          <SubmitButton
                            bgColorHover="#ee582a"
                            bgColor="#91c400"
                            color="#fff"
                            type="submit"
                            disabled={isCtaDisabled}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            {I18n('Next One')}
                          </SubmitButton>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </FormiFormWrapper>
              </Form>
            )}
          </Formik>
        </BillingFormWrapper>
      )}
    </LocaleContext.Consumer>
  );
};

BillingForm.propTypes = {
  explainText: PropTypes.string,
  addBillingInformation: PropTypes.func,
  isCtaDisabled: PropTypes.bool,
  checkedEmail: PropTypes.string,
  notRegisteredEmail: PropTypes.bool,
  registerAndAddBillingInformation: PropTypes.func,
  userData: PropTypes.shape({
    email: PropTypes.string,
    address: PropTypes.shape({
      name: PropTypes.string,
      insertion: PropTypes.string,
      familyName: PropTypes.string,
      postalCode: PropTypes.string,
      streetName: PropTypes.string,
      houseNumber: PropTypes.string,
      addition: PropTypes.string,
      city: PropTypes.string,
      phoneNumber: PropTypes.string,
      gender: PropTypes.string
    })
  })
};

export default BillingForm;
