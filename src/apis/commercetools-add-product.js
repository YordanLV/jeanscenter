
import { client, projectKey } from './commercetools-client-keys';

const commercetoolsAddProduct = function (cartId, version, sku, webshop = 'BE') {
  const request = {
    uri: `/${ projectKey }/carts/${ cartId }`,
    method: 'POST',
    body: {
      'version': version,
      'actions': [{
        'action': 'addLineItem',
        'sku': sku,
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

export default commercetoolsAddProduct;
