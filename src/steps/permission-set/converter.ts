import {
  createIntegrationEntity,
  Entity,
  convertProperties,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_LOGIN_PREFIX = 'salesforce-permission-set';
export function createPermissionSetEntityIdentifier(login: string): string {
  return `${USER_LOGIN_PREFIX}:${login}`;
}

export function createPermissionSetEntity(
  permSet: StandardSchema['SObjects']['PermissionSet']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: permSet,
      assign: {
        ...convertProperties(permSet, { parseTime: true }),
        _key: createPermissionSetEntityIdentifier(permSet.Id), // Must be at least 10 chars long
        _type: Entities.PERMISSION_SET._type,
        _class: Entities.PERMISSION_SET._class,
      },
    },
  });
}
