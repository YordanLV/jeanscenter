import Prismic from 'prismic-javascript';

import { apiEndpoint, apiToken } from './prismic-keys';

const prismicSingleApi = async function (page, lang) {
  const api = await Prismic.api(apiEndpoint, { apiToken });
  const response = await api.query(Prismic.Predicates.at(
    'document.type', page), { lang: lang }
  );
  return response.results[0];
};

export default prismicSingleApi;
