import { Connection, StandardSchema, OAuth2 } from 'jsforce';

import { IntegrationProviderAuthenticationError } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  constructor(readonly config: IntegrationConfig) {
    //Set up the connection
    this.setUpClient();
  }
  conn: Connection<StandardSchema>;

  /**
   * Set up the connection to Salesforce with oauth info
   */
  setUpClient(): void {
    var oauth2 = new OAuth2({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      redirectUri: 'https://login.salesforce.com/services/oauth2/success',
    });
    this.conn = new Connection<StandardSchema>({
      oauth2: oauth2,
      instanceUrl: this.config.instanceUrl,
      accessToken: this.config.accessToken,
      refreshToken: this.config.refreshToken,
    });
  }

  public async verifyAuthentication(): Promise<void> {
    try {
      // TODO: Add a wrapper around the authorize call to get token on initial integration:
      // await this.conn.authorize(code);
      await this.conn.sobject('User').describe();
    } catch (err) {
      // There is a serious issue authenticating with API
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: this.conn.loginUrl,
        status: err.name,
        statusText: err.message,
      });
    }
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUsers(
    iteratee: ResourceIteratee<StandardSchema['SObjects']['User']['Fields']>,
  ): Promise<void> {
    const users = await this.conn.sobject('User').find().autoFetch(true); //autofetch will automatically handle pagination

    for (const user of users) {
      await iteratee(user);
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
