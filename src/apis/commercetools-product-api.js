import { createRequestBuilder } from '@commercetools/api-request-builder';
import { client, projectKey } from './commercetools-client-keys';

const commercetoolsProductApi = async function (productId, webshop = 'BE') {
  const requestBuilder = createRequestBuilder({
    projectKey: projectKey
  });

  const productsUri = requestBuilder.products.byId(productId).build();

  const request = {
    uri: `${ productsUri }/pdp-view?channel=${ webshop }-webshop`,
    method: 'GET'
  };

  return client.execute(request)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default commercetoolsProductApi;
