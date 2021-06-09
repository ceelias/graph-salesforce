import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  clientUsername: {
    type: 'string',
  },
  clientPassword: {
    type: 'string',
    mask: true,
  },
  clientId: {
    type: 'string',
  },
  clientSecret: {
    type: 'string',
    mask: true,
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider API client username used to authenticate requests.
   */
  clientUsername: string;

  /**
   * The provider API client password used to authenticate requests.
   */
  clientPassword: string;

  /**
   * The provider API client username used to authenticate requests.
   */
  clientId: string;

  /**
   * The provider API client password used to authenticate requests.
   */
  clientSecret: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (
    !config.clientUsername ||
    !config.clientPassword ||
    !config.clientId ||
    !config.clientSecret
  ) {
    throw new IntegrationValidationError(
      'Config requires all of {clientUsername, clientPassword, clientId, clientSecret}',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
