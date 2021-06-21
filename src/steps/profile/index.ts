import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import { createProfileEntity } from './converter';

export async function fetchProfiles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateProfiles(async (profile) => {
    await jobState.addEntity(createProfileEntity(profile));
  });
}

export const profileSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PROFILES,
    name: 'Fetch Profile Details',
    entities: [Entities.PROFILE],
    relationships: [Relationships.USER_HAS_PROFILE],
    dependsOn: [],
    executionHandler: fetchProfiles,
  },
];
