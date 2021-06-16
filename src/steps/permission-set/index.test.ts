import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';
import { RelationshipClass } from '@jupiterone/integration-sdk-core';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { integrationConfig } from '../../../test/config';

import { buildUserPermissionSetRelationships, fetchPermissionSets } from '.';
import { fetchUsers } from '../user/';
import { Relationships } from '../constants';

describe('#fetchPermissionSets', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchPermissionSetsShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: integrationConfig,
    });
    await fetchPermissionSets(context);

    expect(context.jobState.collectedEntities).toHaveLength(58);
    expect(context.jobState.collectedRelationships).toHaveLength(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: ['AccessPolicy'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_permission_set' },
          _key: { type: 'string' },
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

describe('#buildUserPermissionSetRelationships', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'buildUserGroupUserRelationshipsShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);
    await fetchPermissionSets(context);
    await buildUserPermissionSetRelationships(context);

    expect(context.jobState.collectedRelationships).toHaveLength(8);
    expect(
      context.jobState.collectedRelationships.filter(
        (r) => r._type === Relationships.USER_HAS_PERMISSION_SET._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.HAS },
          _type: { const: Relationships.USER_HAS_PERMISSION_SET._type },
        },
      },
    });
  });
});
