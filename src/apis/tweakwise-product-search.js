import { client } from './commercetools-client-keys';

const tweakwiseProductSearch = async function (searchTerm, isSearchQuery = false) {
  const request = {
    uri: `/product-search/${ isSearchQuery ? 'navigation-search' : 'navigation' }?channel=BE-webshop&language=nl-BE&${ searchTerm }`,
    method: 'GET'
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default tweakwiseProductSearch;
