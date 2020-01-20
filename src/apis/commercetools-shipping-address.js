import { client, projectKey } from './commercetools-client-keys';

const commercetoolsShippingAddress = function (cartId, version, billingAddress) {
  const request = {
    uri: `/${ projectKey }/carts/${ cartId }`,
    method: 'POST',
    body: {
      version: version,
      actions: [
        {
          action: 'setShippingAddress',
          address: {
            country: billingAddress.country,
            gender: billingAddress.gender,
            firstName: billingAddress.firstName,
            lastName: `${ billingAddress.middleName } ${ billingAddress.lastName }`,
            postalCode: billingAddress.postCode,
            streetNumber: billingAddress.streetNumber,
            streetName: billingAddress.streetName,
            city: billingAddress.city,
            additionalStreetInfo: billingAddress.additionalStreetInfo,
            phone: billingAddress.telNum,
            email: billingAddress.email
          }
        }
      ]
    }
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default commercetoolsShippingAddress;
