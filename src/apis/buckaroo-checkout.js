import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const getBuckarooResponse = async function (cartId, paymentMethod) {
  const request = {
    uri: '/orders/v1/payment',
    method: 'POST',
    body: {
      cartId: cartId,
      provider: paymentMethod
    }
  };

  const requestWithToken = await setAmplifyToken(request);

  return client
    .execute(requestWithToken)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default getBuckarooResponse;
