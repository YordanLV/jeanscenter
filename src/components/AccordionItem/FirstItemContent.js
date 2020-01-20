import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { I18n } from '../../i18n';
import Button from '../common/Button';
import Select from '../common/Select';
import RequiredField from './RequiredField';
import AlertBox from '../AlertBox';

import { LocaleContext } from '../../layout';
import {
  validateEmail,
  nameValidation,
  onlyDigitsWithExactLength,
  passwordValidation,
  checkLength,
  telephoneValidation,
  onlyDigitsMaxLength
} from '../../util/validations';

const FirstItemWrapper = styled.div`
  font-size: 1.6rem;
  input {
    width: 100%;
  }
  label {
    margin-top: 1rem;
    cursor: pointer;
  }
  #additionalStreetInfo,
  #streetNumber,
  #middleName,
  #postCode {
    max-width: 10rem;
  }
`;

const FirstItemText = styled.div`
  margin-bottom: 2.2rem;
  font-size: 1.6rem;
  line-height: 1.6;
`;

const FirstItemContent = ({ explainText, addBillingInformation, isCtaDisabled, isSignUpPage, enteredEmail, createNewUser, isRegistrationError }) => {
  const [formValues, setFormValues] = useState({
    country: { value: 'BE', isValidated: true },
    gender: { value: '', isValidated: false },
    firstName: { value: '', isValidated: false },
    middleName: { value: '', isValidated: true },
    lastName: { value: '', isValidated: false },
    postCode: { value: '', isValidated: false },
    streetName: { value: '', isValidated: false },
    streetNumber: { value: '', isValidated: false },
    additionalStreetInfo: { value: '', isValidated: true },
    city: { value: '', isValidated: false },
    telNum: { value: '', isValidated: false },
    email: { value: enteredEmail || '', isValidated: isSignUpPage }
  });

  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const getInputVal = (id, value, isValidated) => {
    setFormValues({ ...formValues, [id]: { value, isValidated } });
  };

  const submitForm = lang => {
    setIsBtnClicked(true);

    const isFormReady =
      Object.keys(formValues).filter(e => {
        return formValues[e].isValidated !== true;
      }).length === 0;

    if (!isFormReady) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isFormReady && !isSignUpPage) {
      addBillingInformation(formValues);
    }

    if (isFormReady && isSignUpPage) {
      const isPasswordMatching = formValues.password.value === formValues.confirmPassword.value;
      if (!isPasswordMatching) {
        // TODO: show error if passwords dont match
      } else {
        createNewUser({ preferredLanguage: lang, ...formValues });
      }
    }
  };

  const SubmitButton = Button.withComponent('button');

  const passwordMatchingCheck = confirmPassword => {
    const password = formValues.password ? formValues.password.value : null;
    return confirmPassword === password;
  };

  useEffect(() => {
    if (isSignUpPage) {
      setFormValues({
        ...formValues,
        password: { value: '', isValidated: false },
        confirmPassword: { value: '', isValidated: false }
      });
    }
  }, []);

  return (
    <FirstItemWrapper>
      <>
        {explainText && <FirstItemText>{explainText}</FirstItemText>}
        {isRegistrationError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
        <>
          <Row css={{ marginBottom: '2rem' }}>
            <Col sm="4" css={{ display: 'flex' }}>
              <label>{I18n('Country')} *</label>
            </Col>
            <Col sm="8">
              <Select width="50%" selectedOption="BE">
                <option disabled value="BE">
                  {I18n('Belgium', true)}
                </option>
              </Select>
            </Col>
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <Col sm="4" css={{ display: 'flex' }}>
              <label css={{ color: isBtnClicked && !formValues.gender.isValidated ? '#a94442' : 'initial' }}>{I18n('Sex')} *</label>
            </Col>
            <Col sm="8">
              <Select
                id="gender"
                width="50%"
                getInputVal={getInputVal}
                validate={() => true}
                errorMessage={isBtnClicked && !formValues.gender.isValidated ? I18n('Select a gender') : null}
                selectedOption={I18n('Select', true)}
              >
                <option disabled value={I18n('Select', true)}>
                  {I18n('Select', true)}
                </option>
                <option value="MALE">{I18n('Male', true)}</option>
                <option value="FEMALE">{I18n('Female', true)}</option>
              </Select>
            </Col>
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="firstName"
              getInputVal={getInputVal}
              validate={nameValidation}
              errorMessage={isBtnClicked && !formValues.firstName.isValidated ? I18n('Enter your first name here') : null}
              labelText={I18n('First Name *')}
            />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField id="middleName" getInputVal={getInputVal} validate={() => true} labelText={I18n('Tussenvoegsel')} />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="lastName"
              getInputVal={getInputVal}
              validate={nameValidation}
              errorMessage={isBtnClicked && !formValues.lastName.isValidated ? I18n('Enter your last name here') : null}
              labelText={I18n('Last name *')}
            />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="postCode"
              getInputVal={getInputVal}
              validate={onlyDigitsWithExactLength}
              errorMessage={isBtnClicked && !formValues.postCode.isValidated ? I18n('Enter a correct zip code') : null}
              labelText={I18n('Postcode *')}
            />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="streetNumber"
              sm1="4"
              sm2="3"
              getInputVal={getInputVal}
              validate={onlyDigitsMaxLength}
              errorMessage={isBtnClicked && !formValues.streetNumber.isValidated ? I18n('Enter your street number') : null}
              labelText={I18n('Street number *')}
            />

            <RequiredField id="additionalStreetInfo" sm1="2" sm2="3" getInputVal={getInputVal} validate={() => true} labelText={I18n('Toevoeging')} />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="streetName"
              getInputVal={getInputVal}
              validate={checkLength}
              errorMessage={isBtnClicked && !formValues.streetName.isValidated ? I18n('Enter your street name here') : null}
              labelText={I18n('Street name *')}
            />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="city"
              getInputVal={getInputVal}
              validate={checkLength}
              errorMessage={isBtnClicked && !formValues.city.isValidated ? I18n('Enter your location here') : null}
              labelText={I18n('City *')}
            />
          </Row>

          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="telNum"
              getInputVal={getInputVal}
              validate={telephoneValidation}
              errorMessage={isBtnClicked && !formValues.telNum.isValidated ? I18n('Enter valid telephone number') : null}
              labelText={I18n('Telephone number *')}
            />
          </Row>
        </>

        <Row css={{ marginBottom: '2rem' }}>
          <RequiredField
            id="email"
            errorMessage={!isSignUpPage && isBtnClicked && !formValues.email.isValidated ? I18n('Invalid email address') : null}
            getInputVal={getInputVal}
            validate={validateEmail}
            enteredEmail={enteredEmail}
            labelText={I18n('E-mail address *')}
            disabled={isSignUpPage && true}
          />
        </Row>

        {isSignUpPage && (
          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="password"
              errorMessage={
                isBtnClicked && !formValues.password.isValidated
                  ? I18n('Minimum 6 characters, including at least 1 capital letter, 1 small letter and 1 number')
                  : null
              }
              getInputVal={getInputVal}
              validate={passwordValidation}
              labelText={I18n('Password *')}
              type="password"
            />
          </Row>
        )}

        {isSignUpPage && (
          <Row css={{ marginBottom: '2rem' }}>
            <RequiredField
              id="confirmPassword"
              errorMessage={isBtnClicked && !formValues.confirmPassword.isValidated ? I18n('Password does not match') : null}
              getInputVal={getInputVal}
              validate={passwordMatchingCheck}
              labelText={I18n('Confirm password *')}
              type="password"
            />
          </Row>
        )}
        <LocaleContext.Consumer>
          {context => (
            <div css={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <SubmitButton
                bgColorHover="#ee582a"
                bgColor="#91c400"
                color="#fff"
                disabled={isCtaDisabled}
                onClick={() => submitForm(context.preferredLanguage)}
              >
                {isSignUpPage ? I18n('Register') : I18n('Next one')}
              </SubmitButton>
            </div>
          )}
        </LocaleContext.Consumer>
      </>
    </FirstItemWrapper>
  );
};

FirstItemContent.propTypes = {
  explainText: PropTypes.string,
  addBillingInformation: PropTypes.func,
  isCtaDisabled: PropTypes.bool,
  isSignUpPage: PropTypes.bool,
  enteredEmail: PropTypes.string,
  createNewUser: PropTypes.func,
  isRegistrationError: PropTypes.bool
};

export default FirstItemContent;
