import { client } from './commercetools-client-keys';

const accountForgotPassword = function (email) {
  const request = {
    uri: `/me/v1/me/forgotpassword`,
    method: 'POST',
    body: {
      email: email
    }
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default accountForgotPassword;
