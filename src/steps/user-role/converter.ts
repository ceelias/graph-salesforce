import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_ROLE_PREFIX = 'salesforce-user-role';
export function createUserRoleEntityIdentifier(login: string): string {
  return `${USER_ROLE_PREFIX}:${login}`;
}

export function createUserRoleEntity(
  role: StandardSchema['SObjects']['UserRole']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _key: createUserRoleEntityIdentifier(role.Id), // Must be at least 10 chars long
        _type: Entities.USER_ROLE._type,
        _class: Entities.USER_ROLE._class,
        name: role.Name,
      },
    },
  });
}
