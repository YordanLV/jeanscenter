import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const changeEmailAddress = async function (email, password) {
  const request = {
    uri: `/me/v1/me/email`,
    method: 'PUT',
    body: {
      newEmail: email,
      password: password
    }
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default changeEmailAddress;
