
import { client, projectKey } from './commercetools-client-keys';

const commercetoolsDeleteProduct = async function (cartId, version, productId, quantity, webshop = 'BE') {
  const request = {
    uri: `/${ projectKey }/carts/${ cartId }`,
    method: 'POST',
    body: {
      'version': version,
      'actions': [{
        'action': 'removeLineItem',
        'lineItemId': productId,
        'quantity': quantity,
        'distributionChannel': {
          'key': `${ webshop }-webshop`,
          'type': 'channel'
        }
      }]
    }
  };

  return client.execute(request)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default commercetoolsDeleteProduct;
