import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';

import envKeys from '../../envKeys.json';
const activeEnv = process.env.GATSBY_ACTIVE_ENV || 'dev';

const projectKey = 'ctp';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: envKeys[activeEnv].ctp.host,
  projectKey: 'ctp', // HAS TO BE 'ctp'
  credentials: {
    // Cognito credentials
    clientId: envKeys[activeEnv].ctp.clientId,
    clientSecret: envKeys[activeEnv].ctp.clientSecret
  },
  scopes: [
    'manage_project:jogg-workshop-team-29,manage_project:jogg-workshop-team-30'
  ]
});

const httpMiddleware = createHttpMiddleware({
  host: envKeys[activeEnv].ctp.host
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware]
});

export { client, projectKey };
