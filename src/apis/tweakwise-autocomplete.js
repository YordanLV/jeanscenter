import { client } from './commercetools-client-keys';

const tweakwiseAutocomplete = async function (searchWord, language) {
  const request = {
    uri: `/product-search/autocomplete?channel=BE-webshop&language=nl-BE&tn_q=${ searchWord }`,
    method: 'GET'
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default tweakwiseAutocomplete;
