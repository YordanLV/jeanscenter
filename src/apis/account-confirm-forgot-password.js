
import { client } from './commercetools-client-keys';

const accountConfirmForgotPassword = function (email, confirmationCode, password) {
  const request = {
    uri: `/me/v1/me/confirmforgotpassword`,
    method: 'POST',
    body: {
      email: email,
      confirmationCode: confirmationCode,
      password: password
    }
  };

  return client.execute(request)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default accountConfirmForgotPassword;
