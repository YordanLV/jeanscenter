import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const updateUser = async function (sex, name, middleName, lastName) {
  const request = {
    uri: `/me/v1/me`,
    method: 'PUT',
    body: {
      name: name,
      insertion: middleName,
      familyName: lastName,
      gender: sex
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

export default updateUser;
