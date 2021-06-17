import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { integrationConfig } from '../../../test/config';

import { fetchUserRoles } from '.';

describe('#fetchUserRoles', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchUserRolesShouldCollectData',
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
    await fetchUserRoles(context);

    expect(context.jobState.collectedEntities?.length).toBeTruthy;
    expect(context.jobState.collectedRelationships).toHaveLength(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: ['AccessRole'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_user_role' },
          _key: { type: 'string' },
          name: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          opportunityAccessForAccountOwner: { type: 'string' },
          caseAccessForAccountOwner: { type: 'string' },
          contactAccessForAccountOwner: { type: 'string' },
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
