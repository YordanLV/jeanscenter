
import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const getUserData = async function () {
  const request = {
    uri: `/me/v1/me/`,
    method: 'GET'
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default getUserData;
