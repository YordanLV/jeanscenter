const sdkClient = require(`@commercetools/sdk-client`);
const sdkMiddlewareAuth = require(`@commercetools/sdk-middleware-auth`);
const sdkMiddlewareHttp = require(`@commercetools/sdk-middleware-http`);
const path = require('path');
const envKeys = require('./envKeys.json');
const activeEnv = process.env.GATSBY_ACTIVE_ENV || 'dev';

const _ = require('lodash');
const locales = require('./src/i18n/i18n');

const projectKey = envKeys[activeEnv].ctp.projectKey;
const authMiddleware = sdkMiddlewareAuth.createAuthMiddlewareForClientCredentialsFlow({
  host: envKeys[activeEnv].ctp.host,

  projectKey: projectKey,
  credentials: {
    clientId: envKeys[activeEnv].ctp.clientId,
    clientSecret: envKeys[activeEnv].ctp.clientSecret
  },
  scopes: ['manage_project:jogg-workshop-team-29,manage_project:jogg-workshop-team-30']
});

const httpMiddleware = sdkMiddlewareHttp.createHttpMiddleware({
  host: envKeys[activeEnv].ctp.host
});

const client = sdkClient.createClient({
  middlewares: [authMiddleware, httpMiddleware]
});
const { returnParents } = require('./src/util/gatsby-node-helpers.js');

const commercetoolsProductApi = async function () {
  const query = `
    query ($locale: Locale!, $limit: Int, $offset: Int) {
      products (limit: $limit, offset: $offset) {
        total
        results {
          id
          masterData {
            current {
              name(locale: "en")
              slug(locale: "en")
              description(locale:$locale)
              categories {
                id
              }
              masterVariant{
                images{
                  url
                  label
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const request = {
      uri: `/${ projectKey }/graphql`,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { locale: 'nl-be', offset: 0, limit: 1 }
      })
    };
    const resultTotal = await client.execute(request);
    const totalNumber = resultTotal.body.data.products.total;
    const perPage = 200;
    const totalPages = Math.ceil(totalNumber / perPage);

    console.log(`Total products: ${ totalNumber }, totalPages: ${ totalPages }`);

    const products = [];

    for (let page = 0; page <= totalPages; page++) {
      const productsRequest = {
        uri: `/${ projectKey }/graphql`,
        method: 'POST',
        body: JSON.stringify({
          query,
          variables: { locale: 'nl-be', offset: page * perPage, limit: perPage }
        })
      };
      const resultProducts = await client.execute(productsRequest);
      products.push(...resultProducts.body.data.products.results);
    }
    return {
      results: products
    };
  } catch (e) {
    console.log(e);
  }
};

const commercetoolsCategoryApi = async function () {
  const query = `
    query ($locale: Locale!, $limit: Int, $offset: Int) {
      categories(limit: $limit, offset: $offset) {
        total
        results {
          name(locale: $locale)
          id
          key
          lastModifiedAt
          parent {
            key
          }
        }
      }
    }
  `;
  try {
    const request = {
      uri: `/${ projectKey }/graphql`,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { locale: 'nl-be', offset: 0, limit: 1 }
      })
    };
    const resultTotal = await client.execute(request);
    const totalNumber = resultTotal.body.data.categories.total;
    const perPage = 200;
    const totalPages = Math.ceil(totalNumber / perPage);

    console.log(`Total categories: ${ totalNumber }, categoryPages: ${ totalPages }`);

    const categories = [];

    for (let page = 0; page <= totalPages; page++) {
      const categoryRequest = {
        uri: `/${ projectKey }/graphql`,
        method: 'POST',
        body: JSON.stringify({
          query,
          variables: { locale: 'nl-be', offset: page * perPage, limit: perPage }
        })
      };
      const resultCategories = await client.execute(categoryRequest);
      categories.push(...resultCategories.body.data.categories.results);
    }
    return {
      results: categories
    };
  } catch (e) {
    console.log(e);
  }
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  // Create PDP GraphQL nodes as ctpProduct
  const myPdpData = await commercetoolsProductApi();
  const nodePdpContent = JSON.stringify(myPdpData);
  const nodePdpMeta = {
    id: createNodeId(`my-data-${ myPdpData.results[0].id }`),
    parent: null,
    children: [],
    internal: {
      type: `ctpProduct`,
      mediaType: `text/html`,
      content: nodePdpContent,
      contentDigest: createContentDigest(myPdpData)
    }
  };
  const nodePdp = Object.assign({}, myPdpData, nodePdpMeta);
  createNode(nodePdp);

  // Create Category GraphQL nodes as ctpCategory
  const myCatData = await commercetoolsCategoryApi();
  const nodeCatContent = JSON.stringify(myCatData);
  const nodeCatMeta = {
    id: createNodeId(`my-data-${ myCatData }`),
    parent: null,
    children: [],
    internal: {
      type: `ctpCategory`,
      mediaType: `text/html`,
      content: nodeCatContent,
      contentDigest: createContentDigest(myCatData)
    }
  };
  const nodeCat = Object.assign({}, myCatData, nodeCatMeta);
  createNode(nodeCat);
};

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Only create one 404 page at /404.html
  if (page.path.includes('404')) {
    return;
  }

  // First delete the pages so we can re-create them
  deletePage(page);

  Object.keys(locales).forEach(lang => {
    // // Remove the trailing slash from the path, e.g. --> /categories
    // page.path = replaceTrailing(page.path);

    // // Remove the leading AND traling slash from path, e.g. --> categories
    // const name = replaceBoth(page.path);

    // Create the 'slugs' for the pages. Unless default language, add prefix àla '/en'
    const localizedPath = locales[lang].default ? page.path : `${ locales[lang].path }${ page.path }`;

    createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: locales[lang]
      }
    });
  });
};

/* GraphQL internal query for products */
const productPageQuery = graphql => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            ctpProduct {
              results {
                id
                masterData {
                  current {
                    name
                    slug
                    description
                    categories {
                      id
                    }
                    masterVariant {
                      images {
                        url
                        label
                      }
                    }
                  }
                }
              }
            }
            prismic {
              allPdps(lang: "nl-be") {
                edges {
                  node {
                    body {
                      ... on PRISMIC_PdpBodyCheckmark_box {
                        type
                        primary {
                          box_color
                        }
                        fields {
                          list_item
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      ).then(results => {
        if (results.errors) {
          reject(results.errors);
        }
        return results;
      })
    );
  });
};

/* GraphQL internal query for categories */
const categoryPageQuery = graphql => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            ctpCategory {
              results {
                name
                id
                key
                parent {
                  key
                }
              }
            }
          }
        `
      ).then(results => {
        console.log(results);
        if (results.errors) {
          reject(results.errors);
        }
        return results;
      })
    );
  });
};

const categoryCmsQuery = (graphql, key, lang = 'nl-be') => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query loadCategoryCms($tags: [String!], $lang: String!) {
            prismic {
              allCategorys(lang: $lang, tags: $tags) {
                edges {
                  node {
                    key
                    category_nav {
                      ... on PRISMIC_Category_nav {
                        name
                        _linkType
                        body {
                          ... on PRISMIC_Category_navBodySub_category {
                            type
                            label
                            primary {
                              sub_category
                            }
                            fields {
                              product_type
                              subcategory_key
                              subcategory_url {
                                ... on PRISMIC__ExternalLink {
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    body {
                      ... on PRISMIC_CategoryBodySingle_banner {
                        type
                        primary {
                          image_desktop
                          image_mobile
                          buttons_top_position
                          buttons_left_position
                          buttons_top_position_mobile
                          buttons_left_position_mobile
                          buttons_bg_color
                          button_text_color
                        }
                        fields {
                          button_label
                          button_url {
                            ... on PRISMIC__ExternalLink {
                              url
                            }
                          }
                          is_shown_on_mobile
                        }
                      }
                      ... on PRISMIC_CategoryBodyText_headline {
                        type
                        fields {
                          rich_text_line
                        }
                      }
                      ... on PRISMIC_CategoryBodyThree_slot_banner {
                        type
                        primary {
                          button_top_position
                          buttons_bg_color
                          buttons_text_color
                        }
                        fields {
                          image
                          button_url {
                            ... on PRISMIC__ExternalLink {
                              url
                            }
                          }
                          button_label
                        }
                      }
                      ... on PRISMIC_CategoryBodyFour_slot_banner {
                        type
                        primary {
                          buttons_top_position
                          buttons_bg_color
                          buttons_text_color
                        }
                        fields {
                          image
                          button_url {
                            ... on PRISMIC__ExternalLink {
                              url
                            }
                          }
                          button_label
                        }
                      }
                      ... on PRISMIC_CategoryBodyParagraphs {
                        type
                        fields {
                          paragraph
                        }
                      }
                    }
                  }
                }
              }
              allListers(lang: $lang, tags: $tags) {
                edges {
                  node {
                    key
                    top_banner
                    bottom_description
                  }
                }
              }
            }
          }
        `,
        { tags: key, lang: lang }
      ).then(results => {
        console.log(results);
        if (results.errors) {
          reject(results.errors);
        }
        return results;
      })
    );
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productPageTemplate = path.resolve('src/templates/product.js');
  const categoryPageTemplate = path.resolve('src/templates/category.js');
  const categoriesPathsArray = [];
  /* createPage for category pages */
  try {
    const results = await categoryPageQuery(graphql);
    const prismicData = await categoryCmsQuery(graphql);
    const myTreeData = (array, parent, tree) => {
      tree = typeof tree !== 'undefined' ? tree : [];
      parent = typeof parent !== 'undefined' ? parent : { key: '1000' };

      const children = _.filter(array, child => {
        return Number(child.parent && child.parent.key) === Number(parent.key);
      });

      if (!_.isEmpty(children)) {
        if (Number(parent.key) === 1000) {
          tree = children;
        } else {
          parent['children'] = children;
        }
        _.each(children, child => {
          myTreeData(array, child);
        });
      }

      return tree;
    };

    const treeData = myTreeData(results.data.ctpCategory.results);

    Object.keys(locales).forEach(lang => {
      results.data.ctpCategory.results.forEach(async result => {
        const localizedPath = locales[lang].default ? '' : `${ locales[lang].path }/`;
        let parentsArr = [result.name];
        returnParents(results.data.ctpCategory.results, result, parentsArr);
        parentsArr.pop();
        const pathParamsArr = parentsArr.reverse().map(val => _.kebabCase(val));
        const pathParamsString = pathParamsArr.join('/');
        categoriesPathsArray.push({ id: result.id, path: pathParamsString });
        const categoryPath = `${ localizedPath }/${ pathParamsString }`;
        createPage({
          path: categoryPath,
          component: categoryPageTemplate,
          context: {
            id: result.id,
            prismic:
              _.find(prismicData.data.prismic.allCategorys.edges, function (o) {
                return Number(o.node.key) === Number(result.key);
              }) ||
              _.find(prismicData.data.prismic.allListers.edges, function (o) {
                return Number(o.node.key) === Number(result.key);
              }) ||
              {},
            listerData: result,
            listerTree: results.data.ctpCategory.results,
            locale: locales[lang],
            categoryResults: results.data.ctpCategory.results
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
  }

  /* createPage for search pages (uses same template as category) */
  Object.keys(locales).forEach(lang => {
    createPage({
      path: 'search',
      component: categoryPageTemplate,
      context: {
        id: 'search',
        prismic: {},
        listerData: {},
        listerTree: {},
        locale: locales[lang],
        categoryResults: {}
      }
    });
  });

  /* createPage for product pages */
  try {
    const results = await productPageQuery(graphql);
    Object.keys(locales).forEach(lang => {
      results.data.ctpProduct.results.forEach(result => {
        const productCategoryPathArr = categoriesPathsArray.filter(val => {
          if (result.masterData.current.categories.length > 0) {
            if (val.id === result.masterData.current.categories[0].id) {
              return val;
            }
          }
        });
        const productCategoryPath =
          productCategoryPathArr.length > 0 ? (productCategoryPathArr[0].path !== '' ? productCategoryPathArr[0].path : 'product') : 'product';
        const localizedPath = locales[lang].default ? '' : `${ locales[lang].path }/`;
        createPage({
          path: `${ localizedPath }/${ productCategoryPath }/${ _.kebabCase(result.masterData.current.name) }/${ _.kebabCase(
            result.masterData.current.slug
          ) }`,
          component: productPageTemplate,
          context: {
            id: result.id,
            productCategoryPathArr: productCategoryPathArr,
            pdpData: result,
            cmsData: results.data.prismic.allPdps.edges[0].node,
            locale: locales[lang]
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
};
