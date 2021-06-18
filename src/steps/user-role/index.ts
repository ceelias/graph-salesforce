import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { StandardSchema } from 'jsforce';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import {
  createUserRoleEntity,
  createUserRoleEntityIdentifier,
} from './converter';

export async function fetchUserRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUserRoles(async (role) => {
    await jobState.addEntity(createUserRoleEntity(role));
  });
}

export async function fetchUserRoleToUserRoleRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.USER_ROLE._type },
    async (roleEntity) => {
      const role = getRawData<StandardSchema['SObjects']['UserRole']['Fields']>(
        roleEntity,
      );

      if (role?.ParentRoleId) {
        // If this role has a parent, build the role to role relationship
        const parentRoleEntityId = createUserRoleEntityIdentifier(
          role.ParentRoleId,
        );
        const parentRoleEntity = await jobState.findEntity(parentRoleEntityId);
        if (parentRoleEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: Relationships.USER_ROLE_HAS_USER_ROLE._class,
              from: parentRoleEntity,
              to: roleEntity,
              properties: {
                _type: Relationships.USER_ROLE_HAS_USER_ROLE._type,
              },
            }),
          );
        }
      }
    },
  );
}

export const userRoleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USER_ROLES,
    name: 'Fetch User Role Details',
    entities: [Entities.USER_ROLE],
    relationships: [Relationships.USER_ROLE_HAS_USER_ROLE],
    dependsOn: [],
    executionHandler: fetchUserRoles,
  },
  {
    id: Steps.FETCH_USER_ROLE_TO_USER_ROLE_RELATIONSHIP,
    name: 'Build user role to user role relationship',
    entities: [],
    executionHandler: fetchUserRoleToUserRoleRelationship,
    relationships: [Relationships.USER_ROLE_HAS_USER_ROLE],
    dependsOn: [Steps.USER_ROLES],
  },
];
