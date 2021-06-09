import * as dotenv from 'dotenv';
import * as path from 'path';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_CLIENT_ID = 'dummy-client-id';
const DEFAULT_CLIENT_SECRET = 'dummy-client-secret';
const DEFAULT_CLIENT_USERNAME = 'dummy-client-username';
const DEFAULT_CLIENT_PASSWORD = 'dummy-client-password';

export const integrationConfig: IntegrationConfig = {
  clientId: process.env.CLIENT_ID || DEFAULT_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET || DEFAULT_CLIENT_SECRET,
  clientUsername: process.env.CLIENT_USERNAME || DEFAULT_CLIENT_USERNAME,
  clientPassword: process.env.CLIENT_PASSWORD || DEFAULT_CLIENT_PASSWORD,
};
