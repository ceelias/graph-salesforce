import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_LOGIN_PREFIX = 'salesforce-permission-set';
export function createPermissionEntityIdentifier(login: string): string {
  return `${USER_LOGIN_PREFIX}:${login}`;
}

export function createPermissionSetEntity(
  permission: StandardSchema['SObjects']['PermissionSet']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: permission,
      assign: {
        _key: createPermissionEntityIdentifier(permission.Id), // Must be at least 10 chars long
        _type: Entities.PERMISSION_SET._type,
        _class: Entities.PERMISSION_SET._class,
        id: permission.Id,
        name: permission.Name, //required property in J1 User
        // TODO: Include more attributes that are deemed valuable
      },
    },
  });
}
