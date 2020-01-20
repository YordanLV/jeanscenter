const envKeys = require('./envKeys.json');
const activeEnv = process.env.GATSBY_ACTIVE_ENV || 'dev';

console.log(`Using environment config: '${ activeEnv }'`);

require('dotenv').config({
  path: `.env.${ activeEnv }`
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    // eslint-disable-next-line max-len
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    // `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/favicon.png',
        dir: 'auto',
        lang: 'nl-BE',
        background: '#ffffff',
        theme_color: '#91c400',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          firefox: true,
          yandex: true,
          windows: true
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${ __dirname }/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
    //   }
    // },
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: envKeys[activeEnv].prismic.repoName,
        accessToken: envKeys[activeEnv].prismic.token,
        path: '/', // (optional, default: /preview)
        previews: true // (optional, default: false)
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/my-account/*`] }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.TARGET_BUCKET_NAME || 'fake-bucket',
        region: process.env.AWS_REGION,
        // protocol: targetAddress.protocol.slice(0, -1),
        // hostname: targetAddress.hostname,
        acl: null,
        params: {
          // In case you want to add any custom content types:
          // https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/custom-content-type.md
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offlinea
    // 'gatsby-plugin-offline'
  ]
};
