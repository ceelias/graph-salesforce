import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';
import { RelationshipClass } from '@jupiterone/integration-sdk-core';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { integrationConfig } from '../../../test/config';

import { buildGroupRelationships, fetchGroups } from '.';
import { fetchUsers } from '../user/';
import { Relationships } from '../constants';
import { fetchUserRoles } from '../user-role';

describe('#fetchGroups', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchGroupsShouldCollectData',
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
    await fetchGroups(context);

    expect(context.jobState.collectedEntities?.length).toBeTruthy;
    expect(context.jobState.collectedRelationships).toHaveLength(0);
    expect(context.jobState.collectedEntities).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_group' },
          _key: { type: 'string' },
          name: { type: 'string' },
          createdOn: { type: 'number' },
          createdBy: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          developerName: { type: 'string' },
          groupType: { type: 'string' },
          ownerId: { type: 'string' },
          doesSendEmailToMembers: { type: 'boolean' },
          doesIncludeBosses: { type: 'boolean' },
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
        },
        required: [],
      },
    });
  });

  test('should build group to user role relationship', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchGroupsShouldBuildUserRoleRelationship',
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
    await fetchGroups(context);

    // Check that group to role relationship was built
    expect(context.jobState.collectedRelationships?.length).toBeTruthy;

    // Group to group relationship
    expect(
      context.jobState.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_ASSIGNED_USER_ROLE._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.ASSIGNED },
          _type: { const: Relationships.GROUP_ASSIGNED_USER_ROLE._type },
        },
      },
    });
  });
});

describe('#buildGroupRelationships', () => {
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
        recordFailedRequests: false,
      },
    });

    const context = createMockStepExecutionContext({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);
    await fetchGroups(context);
    await buildGroupRelationships(context);

    expect(context.jobState.collectedRelationships?.length).toBeTruthy;

    // Group to group relationship
    expect(
      context.jobState.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_HAS_GROUP._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.HAS },
          _type: { const: Relationships.GROUP_HAS_GROUP._type },
        },
      },
    });

    // Group to user relationship
    expect(
      context.jobState.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_HAS_USER._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.HAS },
          _type: { const: Relationships.GROUP_HAS_USER._type },
        },
      },
    });
  });
});
