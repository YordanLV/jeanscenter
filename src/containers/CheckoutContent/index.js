import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StaticQuery, graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic-graphql';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import { LocaleContext, I18n } from '../../i18n';
import AccordionItem from '../../components/AccordionItem';
import BillingForm from './BillingForm';
import SecondItemContent from '../../components/AccordionItem/SecondItemContent';
import ThirdItemContent from '../../components/AccordionItem/ThirdItemContent';
import CheckoutCheckEmail from './CheckoutCheckEmail';
import CartContent from '../CartContent';
import AlertBox from '../../components/AlertBox';
import { CheckoutFragment } from '../../fragments/CheckoutFragment';
import Auth from '../../components/Auth';
import dispatchInputChange from '../../util/dispatchInputChange';
import LoginResetPassword from '../LoginContent/LoginResetPassword';
import Modal from '../../components/Modal';
import LogoLoader from '../../components/common/LogoLoader';

@inject('cartStore', 'buckarooStore', 'authStore', 'userStore')
@observer
class CheckoutContentCMS extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeStep: 1,
      isCognitoLogin: false,
      isUserEmailNotRegistered: false,
      emailForCheck: '',
      isModalShown: false,
      isResetPasswordEmailNotRegistered: false,
      selectedPaymentMethod: 'Paypal'
    };
  }

  componentDidMount () {
    if (this.props.authStore.authState === 'signedIn' && this.props.userStore.userData && !this.props.userStore.userData.address) {
      this.props.userStore.getUserData();
    }
  }

  componentDidUpdate () {
    // remove cognito login if the user is logged, get data need for form
    if (this.props.authStore.authState === 'signedIn' && this.state.isCognitoLogin === true) {
      this.setState({ isCognitoLogin: false });
      this.props.userStore.getUserData();
    }
    // if data needed for form is missing and user is logged get the data
    if (this.props.authStore.authState === 'signedIn' && this.props.userStore.userData && !this.props.userStore.userData.address) {
      this.props.userStore.getUserData();
    }
  }

  addBillingInformation = async formValues => {
    // user is logged in or doesnt want to register
    await this.props.cartStore.addBillingInformation(formValues);

    // if no error in call proceed to step 2
    if (!this.props.cartStore.isCheckoutBillngFormError) {
      this.changeActiveStep();
    }
  };

  registerAndAddBillingInformation = async formValues => {
    // user wants to register
    const isCheckoutRegistration = true;
    await this.props.userStore.createNewUser(formValues, isCheckoutRegistration);
    if (!this.props.userStore.isRegistrationError) {
      this.addBillingInformation(formValues);
    }
  };

  addShippingInformation = async formValues => {
    await this.props.cartStore.addShippingInformation(formValues);
    // if no error in call proceed to step 3
    if (!this.props.cartStore.isDeliverAddressError) {
      this.changeActiveStep();
    }
  };

  changeActiveStep = () => {
    this.setState((prevState, props) => ({
      activeStep: prevState.activeStep + 1
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  getBuckarooResponse = () => {
    this.props.buckarooStore.getBuckarooResponse(this.props.cartStore.cartView.body.id, this.state.selectedPaymentMethod);
  };

  changeSelectedPaymentMethod = async e => {
    await this.setState({ selectedPaymentMethod: e.currentTarget.value });
  };

  checkIfUserExists = async email => {
    const response = await this.props.userStore.checkIfUserExists(email);

    if (!response) {
      this.setState({ isCognitoLogin: true });
      setTimeout(() => {
        dispatchInputChange('input[name="username"]', this.state.emailForCheck);
      }, 0);
    } else {
      this.setState({ isUserEmailNotRegistered: true });
    }
  };

  getEmailForCheckValue = email => {
    this.setState({ emailForCheck: email });
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

  toggleModal = () => {
    this.setState({ isModalShown: !this.state.isModalShown });
  };

  render () {
    const isUserLogged = this.props.authStore.authState === 'signedIn';
    const billingAddress = this.props.cartStore.billingAddress;
    const isCtaDisabled = this.props.cartStore.isCtaDisabled;
    const userData = this.props.userStore.userData;
    const isRegistrationError = this.props.userStore.isRegistrationError;
    const isResetPasswordEmailSent = this.props.userStore.isResetPasswordEmailSent;
    const isLoading = this.props.userStore.isLoading;
    const isBuckatooCall = this.props.buckarooStore.isLoading;
    const isBuckarooCheckoutError = this.props.buckarooStore.isBuckarooCheckoutError;

    return (
      <LocaleContext.Consumer>
        {context => {
          const checkoutData = this.props.data[context.lang].edges[0].node;
          const paymentIcons = this.props.data[context.lang].edges[0].node.body[0].fields;
          return (
            <Container css={{ marginBottom: '7rem' }} className="container--fluid-xl">
              {(isLoading || isCtaDisabled || isBuckatooCall) && <LogoLoader />}
              <Row>
                <Col sm="12" lg="8">
                  <AccordionItem
                    isActive={this.state.activeStep === 1}
                    number="1"
                    isStepCompleted={this.state.activeStep > 1}
                    title={checkoutData.checkout_title_step_one[0].text}
                  >
                    {this.state.activeStep === 1 && (
                      <>
                        {/* show check email form if user is not logged */}
                        {!isUserLogged && !this.state.isCognitoLogin && !this.state.isUserEmailNotRegistered && (
                          <CheckoutCheckEmail checkIfUserExists={this.checkIfUserExists} getEmailForCheckValue={this.getEmailForCheckValue} />
                        )}

                        {/* show AWS login/reset password if check email is registered */}
                        {this.state.isCognitoLogin && this.props.authStore.authState === 'signIn' && (
                          <div css={{ position: 'relative' }}>
                            {/* AWS loggin form */}
                            <Auth hideDefault={false} />
                            {/* reset password functionality */}
                            <div
                              css={{
                                position: 'absolute',
                                bottom: '23px',
                                left: '0',
                                fontSize: '1.6rem',
                                color: '#212529',
                                cursor: 'pointer'
                              }}
                              onClick={this.toggleModal}
                            >
                              {I18n('Reset password')}
                            </div>
                            {this.state.isModalShown && (
                              <Modal headerTitle={I18n('Reset password', true)} hideModal={this.toggleModal} width="50%">
                                {this.state.isResetPasswordEmailNotRegistered && (
                                  <AlertBox
                                    isWarning={true}
                                    text={I18n('WE DO NOT HAVE AN ACCOUNT FOR THIS EMAIL ADDRESS, THEREFOR CREATE A NEW ACCOUNT', true)}
                                  />
                                )}
                                {isResetPasswordEmailSent && (
                                  <AlertBox text={I18n('WE HAVE SENT YOU AND E-MAIL STATING HOW YOU CAN RESET YOUR PASSWORD', true)} />
                                )}
                                {!this.state.isResetPasswordEmailNotRegistered && !isResetPasswordEmailSent && (
                                  <LoginResetPassword checkEmailForPasswordReset={this.checkEmailForPasswordReset} />
                                )}
                              </Modal>
                            )}
                          </div>
                        )}

                        {/* show billing form with option to register if email is not registered and the user is not registered */}
                        {this.state.isUserEmailNotRegistered && (
                          <>
                            {isRegistrationError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
                            <BillingForm
                              userData={userData}
                              explainText={checkoutData.checkout_explain_text[0].text}
                              addBillingInformation={this.addBillingInformation}
                              registerAndAddBillingInformation={this.registerAndAddBillingInformation}
                              isCtaDisabled={isCtaDisabled}
                              checkedEmail={this.state.emailForCheck}
                              notRegisteredEmail={true}
                            />
                          </>
                        )}

                        {/* show billing form if user is logged */}
                        {isUserLogged && !this.state.isCognitoLogin && (
                          <>
                            {this.props.cartStore.isCheckoutBillngFormError && (
                              <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />
                            )}
                            {userData && userData.address && (
                              <BillingForm
                                userData={userData}
                                explainText={checkoutData.checkout_explain_text[0].text}
                                addBillingInformation={this.addBillingInformation}
                                isCtaDisabled={isCtaDisabled}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem
                    isActive={this.state.activeStep === 2}
                    number="2"
                    isStepCompleted={this.state.activeStep > 2}
                    title={checkoutData.checkout_title_step_two[0].text}
                  >
                    {this.props.cartStore.isDeliverAddressError && (
                      <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />
                    )}
                    {this.state.activeStep === 2 && (
                      <SecondItemContent
                        billingAddress={billingAddress}
                        addShippingInformation={this.addShippingInformation}
                        deliveryTime={checkoutData.delivery_time[0].text}
                        isCtaDisabled={isCtaDisabled}
                      />
                    )}
                  </AccordionItem>
                  <AccordionItem
                    isActive={this.state.activeStep === 3}
                    number="3"
                    isStepCompleted={this.state.activeStep > 3}
                    title={checkoutData.checkout_title_step_three[0].text}
                  >
                    {this.state.activeStep === 3 && (
                      <>
                        {isRegistrationError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
                        <ThirdItemContent
                          getBuckarooResponse={this.getBuckarooResponse}
                          paymentIconsData={paymentIcons}
                          paymentExplanationText={checkoutData.payment_explanation_text}
                          cartId={this.props.cartStore.cartView && this.props.cartStore.cartView.body && this.props.cartStore.cartView.body.id}
                          changeSelectedPaymentMethod={this.changeSelectedPaymentMethod}
                          selectedPaymentMethod={this.state.selectedPaymentMethod}
                          isBuckarooCheckoutError={isBuckarooCheckoutError}
                        />
                      </>
                    )}
                  </AccordionItem>
                </Col>
                <Col sm="12" lg="4">
                  <div css={{ width: '100%', minHeight: '400px', background: '#fff' }}>
                    <CartContent isCheckout={true} />
                  </div>
                </Col>
              </Row>
            </Container>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

const CheckoutContent = props => (
  <StaticQuery
    query={query}
    render={withPreview(
      ({ prismic }) => (
        <CheckoutContentCMS data={prismic} />
      ),
      query,
      [CheckoutFragment]
    )}
  />
);

CheckoutContent.fragments = [CheckoutFragment];

const query = graphql`
  query {
    prismic {
      nl: allCheckouts(lang: "nl-be") {
        edges {
          node {
            ...CheckoutFragment
            body {
              ... on PRISMIC_CheckoutBodyCheckout_icons {
                type
                label
                fields {
                  payment_image
                  payment_text
                }
              }
            }
          }
        }
      }
    }
  }
`;

CheckoutContentCMS.propTypes = {
  data: PropTypes.object,
  cartStore: PropTypes.shape({
    addBillingInformation: PropTypes.func,
    addShippingInformation: PropTypes.func,
    billingAddress: PropTypes.object,
    isCtaDisabled: PropTypes.bool,
    cartView: PropTypes.object,
    isCheckoutBillngFormError: PropTypes.bool,
    isDeliverAddressError: PropTypes.bool
  }),
  buckarooStore: PropTypes.shape({
    getBuckarooResponse: PropTypes.func,
    isBuckarooCheckoutError: PropTypes.bool,
    isLoading: PropTypes.bool
  }),
  authStore: PropTypes.shape({
    authState: PropTypes.string
  }),
  userStore: PropTypes.shape({
    checkIfUserExists: PropTypes.func,
    userData: PropTypes.object,
    getUserData: PropTypes.func,
    createNewUser: PropTypes.func,
    isRegistrationError: PropTypes.bool,
    sendEmailForForgotPassword: PropTypes.func,
    isResetPasswordEmailSent: PropTypes.bool,
    isLoading: PropTypes.bool
  })
};

export default CheckoutContent;
