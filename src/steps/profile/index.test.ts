import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { integrationConfig } from '../../../test/config';

import { fetchProfiles } from '.';

describe('#fetchProfiles', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchProfilesShouldCollectData',
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
    await fetchProfiles(context);

    expect(context.jobState.collectedEntities?.length).toBeTruthy;
    expect(context.jobState.collectedRelationships).toHaveLength(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: ['Account'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_profile' },
          _key: { type: 'string' },
          name: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          createdOn: { type: 'number' },
          createBy: { type: 'string' },
          description: { type: 'string' },
          userType: { type: 'string' },
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
