import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import FormikInputField from '../../components/FormikInputField';
import FormiFormWrapper from '../../components/FormikFromWrapper';
import FormikSelectField from '../../components/FormikSelectField';
import Link from '../../components/Link';
import Button from '../../components/common/Button';
import AlertBox from '../../components/AlertBox';
import { nameValidation, onlyDigitsWithExactLength, checkLength, telephoneValidation, onlyDigitsMaxLength } from '../../util/validations';

const ChangeAddressWrapper = styled.div`
  font-size: 1.6rem;
`;

const UpdateAddressForm = ({ userAddress, accountUpdateUserAddress }) => {
  const SubmitButton = Button.withComponent('button');
  const [formSuccessMessage, setFormSuccessMessage] = useState(false);
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  useEffect(() => {
    setFormSuccessMessage(false);
  }, []);

  return (
    <ChangeAddressWrapper>
      <Formik
        initialValues={{
          country: userAddress.country,
          gender: userAddress.gender,
          firstName: userAddress.name,
          middleName: userAddress.insertion,
          lastName: userAddress.familyName,
          streetName: userAddress.streetName,
          streetNumber: userAddress.houseNumber,
          addition: userAddress.addition,
          postCode: userAddress.postalCode,
          city: userAddress.city,
          telNumber: ''
        }}
        validate={values => {
          let errors = {};
          if (!nameValidation(values.firstName)) {
            errors.firstName = I18n('Enter your first name here');
          }
          if (!nameValidation(values.lastName)) {
            errors.lastName = I18n('Enter your last name here');
          }
          if (!checkLength(values.streetName)) {
            errors.streetName = I18n('Enter your street number');
          }
          if (!onlyDigitsMaxLength(values.streetNumber)) {
            errors.streetNumber = I18n('Enter your street number');
          }
          if (!checkLength(values.city)) {
            errors.city = I18n('Enter your location here');
          }
          if (!telephoneValidation(values.telNumber)) {
            errors.telNumber = I18n('Enter valid telephone number');
          }
          if (!onlyDigitsWithExactLength(values.postCode)) {
            errors.postCode = I18n('Enter a correct zip code');
          }
          return errors;
        }}
        onSubmit={values => {
          accountUpdateUserAddress(values, userAddress.uid);
          setFormSuccessMessage(true);
          setIsBtnSubmitting(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            setIsBtnSubmitting(false);
            setFormSuccessMessage(false);
          }, 3000);
        }}
      >
        {values => (
          <Form>
            <FormiFormWrapper css={{ marginTop: '3rem' }}>
              {formSuccessMessage && <AlertBox text={I18n('Address updated', true)} />}
              <Row>
                <Col md="8">
                  <Row css={{ marginBottom: '2rem' }}>
                    <FormikSelectField id="country" label={I18n('Country *', true)}>
                      <option value={I18n('BE', true)}>{I18n('Belgium', true)}</option>
                    </FormikSelectField>
                  </Row>
                  <Row css={{ marginBottom: '2rem' }}>
                    <FormikSelectField id="gender" name="gender" label={I18n('Sex *', true)} selectedOption={values.initialValues.gender}>
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

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="streetName" fieldName="streetName" label={I18n('Street name *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="streetNumber" fieldName="streetNumber" label={I18n('Street number *', true)} inputMaxWith="8rem" />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="addition" fieldName="addition" label={I18n('Addition', true)} inputMaxWith="8rem" />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="postCode" fieldName="postCode" label={I18n('Postcode *', true)} inputMaxWith="8rem" />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="city" fieldName="city" label={I18n('City *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <FormikInputField id="telNumber" fieldName="telNumber" label={I18n('Telephone number *', true)} />
                  </Row>

                  <Row css={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <Link to="/my-account/address">
                      <Button bgColor="#5C616C" bgColorHover="#ee582a" color="#fff" css={{ marginRight: '1.6rem' }}>
                        {I18n('CANCEL')}
                      </Button>
                    </Link>
                    <SubmitButton bgColor="#91c400" bgColorHover="#ee582a" color="#fff" type="submit" disabled={isBtnSubmitting}>
                      {I18n('SAVE')}
                    </SubmitButton>
                  </Row>
                </Col>
              </Row>
            </FormiFormWrapper>
          </Form>
        )}
      </Formik>
    </ChangeAddressWrapper>
  );
};

UpdateAddressForm.propTypes = {
  userAddress: PropTypes.object,
  accountUpdateUserAddress: PropTypes.func
};

export default UpdateAddressForm;
