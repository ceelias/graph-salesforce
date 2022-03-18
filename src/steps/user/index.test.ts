import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { integrationConfig } from '../../../test/config';

import { fetchUsers } from '.';

describe('#fetchUsers', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchUsersShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: false,
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: integrationConfig,
    });
    await fetchUsers(context);

    expect(context.jobState.collectedEntities?.length).toBeTruthy;
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
          createdBy: { type: 'string' },
          updatedBy: { type: 'string' },
          userType: { type: 'string' },
          active: {type: 'boolean'},
          userPermissionsMarketingUser: { type: 'boolean' },
          userPermissionsOfflineUser: { type: 'boolean' },
          userPermissionsCallCenterAutoLogin: { type: 'boolean' },
          userPermissionsSFContentUser: { type: 'boolean' },
          userPermissionsKnowledgeUser: { type: 'boolean' },
          userPermissionsInteractionUser: { type: 'boolean' },
          userPermissionsSupportUser: { type: 'boolean' },
          userPermissionsAvantgoUser: { type: 'boolean' },
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
