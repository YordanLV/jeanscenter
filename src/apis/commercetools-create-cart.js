
import { client, projectKey } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const commercetoolsCreateCart = async function () {
  const request = {
    uri: `/${ projectKey }/carts`,
    method: 'POST',
    body: {
      currency: 'EUR',
      anonymousId: 'b6741665-532b-4956-9824-e7dc7d23ea69'
    }
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default commercetoolsCreateCart;
