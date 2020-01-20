import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const changePassword = async function (previousPassword, newPassword) {
  const request = {
    uri: `/me/v1/me/password`,
    method: 'PUT',
    body: {
      previousPassword: previousPassword,
      proposedPassword: newPassword
    }
  };

  const requestWithToken = await setAmplifyToken(request);
  // const requestWithJson = JSON.parse(JSON.stringify(requestWithToken));

  return client
    .execute(requestWithToken)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default changePassword;
