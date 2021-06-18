import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import { createGroupEntity, createGroupEntityIdentifier } from './converter';
import { createUserEntityIdentifier } from '../user/converter';
import { createUserRoleEntityIdentifier } from '../user-role/converter';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateGroups(async (group) => {
    const groupEntity = await jobState.addEntity(createGroupEntity(group));

    if (group.Type && group.RelatedId) {
      if (group.Type == 'Role' || group.Type == 'RoleAndSubordinates') {
        // Create Group has Role relationship
        const roleEntityId = createUserRoleEntityIdentifier(group.RelatedId);
        const roleEntity = await jobState.findEntity(roleEntityId);

        if (roleEntity && groupEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: Relationships.GROUP_HAS_USER_ROLE._class,
              from: groupEntity,
              to: roleEntity,
              properties: {
                _type: Relationships.GROUP_HAS_USER_ROLE._type,
              },
            }),
          );
        }
      }
    }
  });
}

export async function buildGroupRelationships({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  // Get the Group Membership Object
  await apiClient.iterateGroupMembers(async (groupMember) => {
    // Group member uses UserOrGroupId to map to either user or group
    // This piece tries to find if it maps to a user or a group and
    // creates the relationship
    const userEntity = await jobState.findEntity(
      createUserEntityIdentifier(groupMember.UserOrGroupId),
    );
    const nestedGroupEntity = await jobState.findEntity(
      createGroupEntityIdentifier(groupMember.UserOrGroupId),
    );
    const groupEntity = await jobState.findEntity(
      createGroupEntityIdentifier(groupMember.GroupId),
    );

    if (userEntity && groupEntity) {
      // Create group has user relationship
      await jobState.addRelationship(
        createDirectRelationship({
          _class: Relationships.GROUP_HAS_USER._class,
          from: groupEntity,
          to: userEntity,
          properties: {
            _type: Relationships.GROUP_HAS_USER._type,
          },
        }),
      );
    } else if (nestedGroupEntity && groupEntity) {
      // Create Group has group relationship
      await jobState.addRelationship(
        createDirectRelationship({
          _class: Relationships.GROUP_HAS_GROUP._class,
          from: groupEntity,
          to: nestedGroupEntity,
          properties: {
            _type: Relationships.GROUP_HAS_GROUP._type,
          },
        }),
      );
    }
  });
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.GROUPS,
    name: 'Fetch Group Details',
    entities: [Entities.GROUP],
    relationships: [
      Relationships.GROUP_HAS_USER,
      Relationships.GROUP_HAS_GROUP,
      Relationships.GROUP_HAS_USER_ROLE,
    ],
    dependsOn: [Steps.USER_ROLES],
    executionHandler: fetchGroups,
  },
  {
    id: Steps.BUILD_GROUP_RELATIONSHIPS,
    name: 'Build group to group, group to user relationship',
    entities: [],
    executionHandler: buildGroupRelationships,
    relationships: [
      Relationships.GROUP_HAS_USER,
      Relationships.GROUP_HAS_GROUP,
    ],
    dependsOn: [Steps.USERS, Steps.GROUPS],
  },
];
