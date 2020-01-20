import envKeys from '../../envKeys.json';
const activeEnv = process.env.GATSBY_ACTIVE_ENV || 'dev';

const apiEndpoint = envKeys[activeEnv].prismic.endPoint;
const apiToken = envKeys[activeEnv].prismic.token;

export {
  apiEndpoint,
  apiToken
};
