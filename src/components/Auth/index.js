import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Amplify from 'aws-amplify';
import { Authenticator, SignUp, ForgotPassword } from 'aws-amplify-react';

import envKeys from '../../../envKeys.json';
import theme from './amplifyTheme';
import { LocaleContext, I18n } from '../../i18n';

const activeEnv = process.env.GATSBY_ACTIVE_ENV || 'dev';
const awsExports = envKeys[activeEnv].awsExports;

Amplify.configure(awsExports);

const dict = {
  nl: {
    'Sign in to your account': I18n('LOG IN / RESET PASSWORD'),
    Username: I18n('E-mail address'),
    Password: I18n('Password'),
    'Forget your password?': I18n('Forgot your password?'),
    'Reset password': I18n('Reset password'),
    'Enter your username': I18n('Enter your username', true),
    'Enter your password': I18n('Enter your password', true),
    'Reset your password': I18n('RESET YOUR PASSWORD'),
    'Back to Sign In': I18n('Back to Sign In'),
    'Send code': I18n('Send code')
  }
};

Amplify.I18n.putVocabularies(dict);

@inject('authStore')
@observer
class Auth extends React.Component {
  componentDidMount () {
    Amplify.I18n.setLanguage(this.context ? this.context.lang : 'nl');
  }
  handleAuthStateChange = state => {
    this.props.authStore.setAuthState(state);
  };
  static contextType = LocaleContext;
  render () {
    return (
      <div>
        <Authenticator
          hideDefault={this.props.hideDefault}
          theme={theme}
          hide={[SignUp, ForgotPassword]}
          onStateChange={this.handleAuthStateChange}
        />
      </div>
    );
  }
}

Auth.propTypes = {
  hideDefault: PropTypes.bool,
  authStore: PropTypes.shape({
    setAuthState: PropTypes.func
  })
};

export default Auth;
