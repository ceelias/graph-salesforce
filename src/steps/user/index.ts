import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import { createUserEntity } from './converter';
import { createUserRoleEntityIdentifier } from '../user-role/converter';
import { createProfileEntityIdentifier } from '../profile/converter';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUsers(async (user) => {
    const userEntity = await jobState.addEntity(createUserEntity(user));

    if (user.UserRoleId) {
      //Check to see if this user has a role and if so make relationship
      const userRoleEntityId = createUserRoleEntityIdentifier(user.UserRoleId);
      const userRoleEntity = await jobState.findEntity(userRoleEntityId);

      if (userRoleEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: Relationships.USER_ASSIGNED_ROLE._class,
            from: userEntity,
            to: userRoleEntity,
            properties: {
              _type: Relationships.USER_ASSIGNED_ROLE._type,
            },
          }),
        );
      }
    }

    if (user.ProfileId) {
      //Check to see if this user has a profile and if so make relationship
      const profileEntityId = createProfileEntityIdentifier(user.ProfileId);
      const profileEntity = await jobState.findEntity(profileEntityId);

      if (profileEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: Relationships.USER_HAS_PROFILE._class,
            from: userEntity,
            to: profileEntity,
            properties: {
              _type: Relationships.USER_HAS_PROFILE._type,
            },
          }),
        );
      }
    }
  });
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS,
    name: 'Fetch User Details',
    entities: [Entities.USER],
    relationships: [
      Relationships.USER_ASSIGNED_ROLE,
      Relationships.USER_HAS_PROFILE,
    ],
    dependsOn: [Steps.USER_ROLES, Steps.PROFILES],
    executionHandler: fetchUsers,
  },
];
