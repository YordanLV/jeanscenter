import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import ResetPasswordForm from './ResetPasswordForm';

@inject('userStore')
@observer
class ResetPasswordContent extends Component {
  render () {
    return (
      <Container>
        <Row>
          <ResetPasswordForm accountConfirmForgotPassword={this.props.userStore.accountConfirmForgotPassword} />
        </Row>
      </Container>
    );
  }
}

ResetPasswordContent.propTypes = {
  userStore: PropTypes.shape({
    accountConfirmForgotPassword: PropTypes.func
  })
};

export default ResetPasswordContent;
