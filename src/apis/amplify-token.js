import { Auth } from 'aws-amplify';

const setAmplifyToken = async function (request) {
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false /* Optional, By default is false. If set to true, this call will
      send a request to Cognito to get the latest user data */
    });
    request['headers'] = {
      Authorization: `Bearer ${ user.signInUserSession.accessToken.jwtToken }`
    };
    return request;
  } catch (e) {
    console.log(e);
    return request;
  }
};

export default setAmplifyToken;
