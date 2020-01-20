
import { client, projectKey } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const getAssignCart = async function (customerId) {
  const request = {
    uri: `/${ projectKey }/carts/?customerId=${ customerId }`,
    method: 'GET'
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default getAssignCart;
