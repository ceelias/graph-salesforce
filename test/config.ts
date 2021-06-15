import * as dotenv from 'dotenv';
import * as path from 'path';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_ACCESS_TOKEN = 'dummy-access-token';
const DEFAULT_INSTANCE_URL = 'https://www.invalid-dummy-url.com';
const DEFAULT_CLIENT_ID = 'dummy-client-id';
const DEFAULT_REFRESH_TOKEN = 'dummy-refresh-token';
const DEFAULT_CLIENT_SECRET = 'dummy-client-secret';

export const integrationConfig: IntegrationConfig = {
  accessToken: process.env.ACCESS_TOKEN || DEFAULT_ACCESS_TOKEN,
  instanceUrl: process.env.INSTANCE_URL || DEFAULT_INSTANCE_URL,
  refreshToken: process.env.REFRESH_TOKEN || DEFAULT_REFRESH_TOKEN,
  clientId: process.env.CLIENT_ID || DEFAULT_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET || DEFAULT_CLIENT_SECRET,
};
