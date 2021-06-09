import {
  createIntegrationEntity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../client';
import { IntegrationConfig } from '../config';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUsers(async (user) => {
    await jobState.addEntity(
      createIntegrationEntity({
        entityData: {
          source: user,
          assign: {
            _key: user.Id, // Must be at least 10 chars long
            _type: 'salesforce_user',
            _class: 'User',
            username: user.Username, //required property in J1 User
            name: user.Name, //required property in J1 User
            // TODO: currently the emails are failing to fit the format (some are missing .com)
            // email: user.Email,
            shortLoginId: user.CommunityNickname,
            // TODO: Include more attributes that are deemed valuable
          },
        },
      }),
    );
  });
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-user',
    name: 'Fetch User Details',
    entities: [
      {
        resourceName: 'User',
        _type: 'salesforce_user',
        _class: 'User',
      },
    ],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchUsers,
  },
];
