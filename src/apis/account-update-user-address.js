import { client } from './commercetools-client-keys';
import setAmplifyToken from './amplify-token';

const accountUpdateUserAddress = async function (userAddress, userUid) {
  const request = {
    uri: `/me/v1/me/addresses/${ userUid }`,
    method: 'PUT',
    body: {
      'country': userAddress.country,
      'gender': userAddress.gender,
      'name': userAddress.firstName,
      'insertion': userAddress.middleName,
      'familyName': userAddress.lastName,
      'streetName': userAddress.streetName,
      'houseNumber': userAddress.streetNumber,
      'addition': userAddress.addition,
      'postalCode': userAddress.postCode,
      'city': userAddress.city,
      'phoneNumber': userAddress.telNumber,
      'defaultAddress': true
    }
  };

  const requestWithToken = await setAmplifyToken(request);

  return client.execute(requestWithToken)
    .then(result => { return result; })
    .catch(error => console.log(error));
};

export default accountUpdateUserAddress;
