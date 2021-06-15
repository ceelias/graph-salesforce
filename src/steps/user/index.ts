import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  createDirectRelationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import { createUserEntity } from './converter';
import { createUserRoleEntityIdentifier } from '../user-role/converter';

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
            _class: RelationshipClass.HAS,
            from: userEntity,
            to: userRoleEntity,
            properties: {
              _type: Relationships.USER_HAS_ROLE._type,
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
    relationships: [Relationships.USER_HAS_ROLE],
    dependsOn: [],
    executionHandler: fetchUsers,
  },
];
