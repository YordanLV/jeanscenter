
import { client, projectKey } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const commercetoolsGetCartView = async function (cartId) {
  const request = {
    uri: `/${ projectKey }/carts/${ cartId }/cart-view`,
    method: 'GET'
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default commercetoolsGetCartView;
