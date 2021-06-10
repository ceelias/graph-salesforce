import {
  createMockStepExecutionContext,
  Recording,
  setupRecording,
} from '@jupiterone/integration-sdk-testing';

import * as dotenv from 'dotenv';
import * as path from 'path';

import { fetchUsers } from './user';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
  });
}

describe('#fetchUsers', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupRecording({
      directory: __dirname,
      name: 'fetchUsersShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: {
        clientId: process.env.CLIENT_ID || 'dummy-client-id',
        clientSecret: process.env.CLIENT_SECRET || 'dummy-client-secret',
        clientUsername: process.env.CLIENT_USERNAME || 'dummy-client-username',
        clientPassword: process.env.CLIENT_PASSWORD || 'dummy-client-password',
      },
    });
    await fetchUsers(context);

    expect(context.jobState.collectedEntities).toHaveLength(7);
    expect(context.jobState.collectedRelationships).toHaveLength(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_user' },
          _key: { type: 'string' },
          username: { type: 'string' },
          shortLoginId: { type: 'string' },
          name: { type: 'string' },
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
        },
        required: [],
      },
    });
  });
});
