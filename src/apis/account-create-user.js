import { client } from './commercetools-client-keys';

const createUser = function (userInfo, isCheckoutRegistration) {
  const request = {
    uri: '/me/v1/me',
    method: 'POST',
    body: {
      user: {
        email: isCheckoutRegistration ? userInfo.email : userInfo.email.value,
        country: isCheckoutRegistration ? userInfo.country : userInfo.country.value,
        name: isCheckoutRegistration ? userInfo.firstName : userInfo.firstName.value,
        insertion: isCheckoutRegistration ? userInfo.middleName : userInfo.middleName.value,
        preferredLanguage: userInfo.preferredLanguage,
        familyName: isCheckoutRegistration ? userInfo.lastName : userInfo.lastName.value,
        phoneNumber: '0611091946',
        gender: isCheckoutRegistration ? userInfo.gender : userInfo.gender.value,
        loyaltycardnumber: '',
        registrationWebshop: '',
        defaultAddress: {
          country: isCheckoutRegistration ? userInfo.country : userInfo.country.value,
          gender: isCheckoutRegistration ? userInfo.gender : userInfo.gender.value,
          name: isCheckoutRegistration ? userInfo.firstName : userInfo.firstName.value,
          insertion: isCheckoutRegistration ? userInfo.middleName : userInfo.middleName.value,
          familyName: isCheckoutRegistration ? userInfo.lastName : userInfo.lastName.value,
          streetName: isCheckoutRegistration ? userInfo.streetName : userInfo.streetName.value,
          houseNumber: isCheckoutRegistration ? userInfo.streetNumber : userInfo.streetNumber.value,
          addition: isCheckoutRegistration ? userInfo.additionalStreetInfo : userInfo.additionalStreetInfo.value,
          postalCode: isCheckoutRegistration ? userInfo.postCode : userInfo.postCode.value,
          city: isCheckoutRegistration ? userInfo.city : userInfo.city.value,
          phoneNumber: '0989899999'
        }
      },
      password: isCheckoutRegistration ? userInfo.password : userInfo.password.value
    }
  };

  return client
    .execute(request)
    .then(result => {
      return result;
    })
    .catch(error => console.log(error));
};

export default createUser;
