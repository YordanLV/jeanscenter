
import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const assignCart = async function (cartID) {
  const request = {
    uri: `/me/v1/me/assignCart`,
    method: 'POST',
    body: {
      anonymousCartID: cartID
    }
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default assignCart;
