import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps } from '../constants';
import { createUserRoleEntity } from './converter';

export async function fetchUserRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUserRoles(async (role) => {
    await jobState.addEntity(createUserRoleEntity(role));
  });
}

export const userRoleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USER_ROLES,
    name: 'Fetch User Role Details',
    entities: [Entities.USER_ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchUserRoles,
  },
];
