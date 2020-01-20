import Prismic from 'prismic-javascript';

import { apiEndpoint, apiToken } from './prismic-keys';
// Ftech all brands
const prismicQueryApi = async function (page, lang) {
  const api = await Prismic.api(apiEndpoint, { apiToken });
  const response = await api.query(Prismic.Predicates.at('document.type', page), {
    lang: lang,
    orderings: `[my.${ page }.name]`
  });
  return response;
};

export default prismicQueryApi;
