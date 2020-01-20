import React, { Component } from 'react';
import { navigate } from '../../components/Navigate';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import WhiteBox from '../../components/common/WhiteBox';
import FirstItemContent from '../../components/AccordionItem/FirstItemContent';
import LogoLoader from '../../components/common/LogoLoader';

@inject('userStore', 'authStore')
@observer
class SignUpContent extends Component {
  createNewUser = async userInfo => {
    try {
      await this.props.userStore.createNewUser(userInfo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // if call was success
      if (!this.props.userStore.isRegistrationError) {
        navigate('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount () {
    this.props.userStore.clearRegistrationError();
  }

  render () {
    if (!this.props.userStore.unregisteredEmail) {
      navigate('/login');
    }

    const isRegistrationError = this.props.userStore.isRegistrationError;

    return (
      <Container>
        <WhiteBox>
          <Row>
            <Col sm="10">
              <FirstItemContent
                isSignUpPage={true}
                enteredEmail={this.props.userStore.unregisteredEmail}
                createNewUser={this.createNewUser}
                isRegistrationError={isRegistrationError}
              />
            </Col>
          </Row>
        </WhiteBox>
        {this.props.userStore.isLoading && <LogoLoader />}
      </Container>
    );
  }
}

SignUpContent.propTypes = {
  userStore: PropTypes.shape({
    checkIfUserExists: PropTypes.func,
    createNewUser: PropTypes.func,
    isLoading: PropTypes.bool,
    unregisteredEmail: PropTypes.string,
    isRegistrationError: PropTypes.bool,
    clearRegistrationError: PropTypes.func
  }),
  authStore: PropTypes.shape({
    authState: PropTypes.string
  })
};

export default SignUpContent;
