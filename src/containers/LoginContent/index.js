import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import { navigate } from "../../components/Navigate";
import { Container, Row, Col } from "reactstrap";
import Auth from "../../components/Auth";
import Input from "../../components/common/InputText/Input";
import WhiteBox from "../../components/common/WhiteBox";
import H1 from "../../components/common/H1";
import Button from "../../components/common/Button";
import LogoLoader from "../../components/common/LogoLoader";
import Modal from "../../components/Modal";
import LoginResetPassword from "./LoginResetPassword";
import AlertBox from "../../components/AlertBox";

@inject("userStore", "authStore")
@observer
class LoginContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserEmailNotRegistered: false,
      isLoginShow: false,
      email: "",
      isBtnDisabled: true,
      isModalShown: false,
      isResetPasswordEmailNotRegistered: false,
      isResetPasswordSuccess: null
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const paramsResetPassword = url.searchParams.get("resetPasswordSuccess");

    if (paramsResetPassword !== null) {
      this.setState({ isResetPasswordSuccess: paramsResetPassword });
    }
  }

  checkIfUserEmailIsRegistered = async () => {
    const isNotRegistered = await this.props.userStore.checkIfUserExists(
      this.state.email
    );
    this.setState({ isUserEmailNotRegistered: isNotRegistered });
    if (isNotRegistered) {
      this.props.userStore.unregisteredEmail = this.state.email;
      navigate("/signup");
    } else {
      this.setState({ isLoginShow: true });
      setTimeout(() => {
        dispatchInputChange('input[name="username"]', this.state.email);
      }, 0);
    }
  };

  checkEmailForPasswordReset = async email => {
    const isNotRegistered = await this.props.userStore.checkIfUserExists(email);
    if (isNotRegistered) {
      this.setState({
        isResetPasswordEmailNotRegistered: true
      });
    } else {
      await this.props.userStore.sendEmailForForgotPassword(email);
    }
  };

  getEmailValue = e => {
    this.setState({
      email: e.target.value,
      isEmailInvalid: !validateEmail(e.target.value),
      isBtnDisabled: !validateEmail(e.target.value)
    });
  };

  toggleModal = () => {
    this.setState({
      isModalShown: !this.state.isModalShown,
      isResetPasswordEmailNotRegistered: false
    });
  };

  render() {
    const SubmitButton = Button.withComponent("button");

    if (this.props.authStore.authState === "signedIn") {
      navigate("/my-account");
      return <div css={{ height: "70rem" }} />;
    }

    return (
      <Container css={{ marginBottom: "6rem" }}>
        {this.props.userStore.isLoading && <LogoLoader />}
        {this.state.isResetPasswordSuccess === "false" ? (
          <AlertBox
            isError={true}
            text={I18n(
              "DE LINK DIE JE HEBT GEBRUIKT IS NIET (MEER) GELDIG",
              true
            )}
          />
        ) : (
          ""
        )}
        {this.state.isResetPasswordSuccess === "true" ? (
          <AlertBox
            text={I18n(
              "GELUKTI JE KUNT NU INLOGGEN MET JE NIEUWE WACHTWOORD",
              true
            )}
          />
        ) : (
          ""
        )}
        <WhiteBox>
          {!this.state.isUserEmailNotRegistered && !this.state.isLoginShow && (
            <>
              <H1>{I18n("LOG IN / REGISTER")}</H1>
              <p css={{ margin: "0 0 2.2rem", fontSize: "1.6rem" }}>
                {I18n(
                  `Enter your e-mail address. We will then check whether you are JC FRIEND and / or already have a webshop account..`
                )}
              </p>
              <Row>
                <Col sm='3'>
                  <label css={{ fontSize: "1.6rem" }} htmlFor='emailOne'>
                    {I18n("E-mail address *")}
                  </label>
                </Col>
                <Col sm='7'>
                  <Input
                    css={{ fontSize: "1.6rem", width: "100%" }}
                    id='emailOne'
                    onChange={this.getEmailValue}
                    type='email'
                  />
                  {this.state.isEmailInvalid && (
                    <div
                      css={{
                        marginTop: "0.5rem",
                        textAlign: "right",
                        fontSize: "1.3rem"
                      }}
                    >
                      {I18n("Invalid email address")}
                    </div>
                  )}
                </Col>
                <Col
                  sm='10'
                  css={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1.5rem"
                  }}
                >
                  <SubmitButton
                    bgColorHover='#ee582a'
                    bgColor='#91c400'
                    color='#fff'
                    onClick={this.checkIfUserEmailIsRegistered}
                    disabled={this.state.isBtnDisabled}
                  >
                    {I18n("LOG IN / REGISTER")}
                  </SubmitButton>
                </Col>
              </Row>
            </>
          )}

          {!this.state.isUserEmailNotRegistered && this.state.isLoginShow && (
            <Row>
              <Col md='9' css={{ position: "relative" }}>
                <Auth hideDefault={false} />
                <div
                  css={{
                    position: "absolute",
                    bottom: "23px",
                    left: "8px",
                    fontSize: "1.6rem",
                    color: "#212529",
                    cursor: "pointer"
                  }}
                  onClick={this.toggleModal}
                >
                  {I18n("Reset password")}
                </div>
                {this.state.isModalShown && (
                  <Modal
                    headerTitle={I18n("Reset password", true)}
                    hideModal={this.toggleModal}
                    width='50%'
                  >
                    {this.state.isResetPasswordEmailNotRegistered && (
                      <AlertBox
                        isWarning={true}
                        text={I18n(
                          "WE DO NOT HAVE AN ACCOUNT FOR THIS EMAIL ADDRESS, THEREFOR CREATE A NEW ACCOUNT",
                          true
                        )}
                      />
                    )}
                    {this.props.userStore.isResetPasswordEmailSent && (
                      <AlertBox
                        text={I18n(
                          "WE HAVE SENT YOU AND E-MAIL STATING HOW YOU CAN RESET YOUR PASSWORD",
                          true
                        )}
                      />
                    )}
                    {!this.state.isResetPasswordEmailNotRegistered &&
                      !this.props.userStore.isResetPasswordEmailSent && (
                        <LoginResetPassword
                          checkEmailForPasswordReset={
                            this.checkEmailForPasswordReset
                          }
                        />
                      )}
                  </Modal>
                )}
              </Col>
            </Row>
          )}
        </WhiteBox>
      </Container>
    );
  }
}

LoginContent.propTypes = {
  userStore: PropTypes.shape({
    checkIfUserExists: PropTypes.func,
    isLoading: PropTypes.bool,
    unregisteredEmail: PropTypes.string,
    sendEmailForForgotPassword: PropTypes.func,
    isResetPasswordEmailSent: PropTypes.bool
  }),
  authStore: PropTypes.shape({
    authState: PropTypes.string
  })
};

export default LoginContent;
