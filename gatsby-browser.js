import wrapWithProvider from './mobx-provider';
export const wrapRootElement = wrapWithProvider;

const { registerLinkResolver } = require('gatsby-source-prismic-graphql');

registerLinkResolver(require('./src/linkResolver').linkResolver);

export const registerServiceWorker = () => true;
