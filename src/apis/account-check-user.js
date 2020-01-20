
import { client } from './commercetools-client-keys';

const checkUser = function (email) {
  const request = {
    uri: `/me/v1/me/${ email }/available`,
    method: 'GET'
  };

  return client.execute(request)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default checkUser;
