import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import Input from '../../components/common/InputText/Input';
import Button from '../../components/common/Button';
import { I18n } from '../../i18n';
import { validateEmail } from '../../util/validations';

const ResetPasswordWrapper = styled.div`
  font-size: 1.6rem;
  label {
    width: 100%;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
  input {
    width: 100%;
  }
`;

const LoginResetPassword = ({ checkEmailForPasswordReset }) => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const SubmitButton = Button.withComponent('button');

  const validateUserEmail = e => {
    setIsErrorShown(!validateEmail(e.target.value));
    setIsButtonDisabled(!validateEmail(e.target.value));
    setUserEmail(e.target.value);
  };

  const submitForm = () => {
    setIsButtonDisabled(true);
    checkEmailForPasswordReset(userEmail);
  };

  return (
    <ResetPasswordWrapper>
      <div css={{ marginBottom: '2rem' }}>
        {I18n('Enter your email address. We will send you a link with which you can reset your password')}
      </div>
      <Row>
        <Col sm="12">
          <label css={{ fontSize: '1.6rem' }} htmlFor="emailOne">
            {I18n('E-mail address *')}
          </label>
        </Col>
        <Col sm="12">
          <Input css={{ fontSize: '1.6rem', width: '100%' }} id="emailOne" onChange={validateUserEmail} type="email" />
          {isErrorShown && (
            <div css={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '1.3rem' }}>
              {I18n('Invalid email address')}
            </div>
          )}
        </Col>
      </Row>
      <div className="button-wrapper">
        <SubmitButton
          bgColorHover="#ee582a"
          bgColor="#91c400"
          color="#fff"
          disabled={isButtonDisabled}
          onClick={submitForm}
        >
          {I18n('SEND')}
        </SubmitButton>
      </div>
    </ResetPasswordWrapper>
  );
};

LoginResetPassword.propTypes = {
  checkEmailForPasswordReset: PropTypes.func,
  isResetPasswordEmailNotRegistered: PropTypes.bool
};

export default LoginResetPassword;
