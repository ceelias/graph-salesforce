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
    const oauth2 = new OAuth2({
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

  /**
   * Iterates each user role resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUserRoles(
    iteratee: ResourceIteratee<
      StandardSchema['SObjects']['UserRole']['Fields']
    >,
  ): Promise<void> {
    const userRoles = await this.conn
      .sobject('UserRole')
      .find()
      .autoFetch(true); //autofetch will automatically handle pagination

    for (const role of userRoles) {
      await iteratee(role);
    }
  }

  /**
   * Iterates each permission set resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iteratePermissionSets(
    iteratee: ResourceIteratee<
      StandardSchema['SObjects']['PermissionSet']['Fields']
    >,
  ): Promise<void> {
    const permSets = await this.conn
      .sobject('PermissionSet')
      .find()
      .autoFetch(true);

    for (const set of permSets) {
      await iteratee(set);
    }
  }

  /**
   * Iterates each permission set assignment resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iteratePermissionSetAssignments(
    iteratee: ResourceIteratee<
      StandardSchema['SObjects']['PermissionSetAssignment']['Fields']
    >,
  ): Promise<void> {
    const permAssignments = await this.conn
      .sobject('PermissionSetAssignment')
      .find()
      .autoFetch(true); //autofetch will automatically handle pagination

    for (const assignment of permAssignments) {
      await iteratee(assignment);
    }
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateGroups(
    iteratee: ResourceIteratee<StandardSchema['SObjects']['Group']['Fields']>,
  ): Promise<void> {
    const groups = await this.conn.sobject('Group').find().autoFetch(true);

    for (const group of groups) {
      await iteratee(group);
    }
  }

  /**
   * Iterates each group members resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateGroupMembers(
    iteratee: ResourceIteratee<
      StandardSchema['SObjects']['GroupMember']['Fields']
    >,
  ): Promise<void> {
    const members = await this.conn
      .sobject('GroupMember')
      .find()
      .autoFetch(true); //autofetch will automatically handle pagination

    for (const member of members) {
      await iteratee(member);
    }
  }

  /**
   * Iterates each profile resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateProfiles(
    iteratee: ResourceIteratee<StandardSchema['SObjects']['Profile']['Fields']>,
  ): Promise<void> {
    const profiles = await this.conn.sobject('Profile').find().autoFetch(true);

    for (const profile of profiles) {
      await iteratee(profile);
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
