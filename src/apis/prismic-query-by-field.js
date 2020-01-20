import Prismic from 'prismic-javascript';

import { apiEndpoint, apiToken } from './prismic-keys';

const prismicQueryApi = async function (fieldName) {
  const api = await Prismic.api(apiEndpoint, { apiToken });
  const response = await api.query(Prismic.Predicates.any('document.type', [fieldName]), { lang: 'nl-be' });
  return response;
};

export default prismicQueryApi;
