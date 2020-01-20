import { client } from './commercetools-client-keys';

const assignCart = async function (cartID) {
  const request = {
    uri: `/ctp/categories`,
    method: 'GET'
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default assignCart;
