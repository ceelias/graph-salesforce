import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_LOGIN_PREFIX = 'salesforce-user';
export function createUserEntityIdentifier(login: string): string {
  return `${USER_LOGIN_PREFIX}:${login}`;
}

export function createUserEntity(
  user: StandardSchema['SObjects']['User']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: createUserEntityIdentifier(user.Id), // Must be at least 10 chars long
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        username: user.Username, //required property in J1 User
        name: user.Name, //required property in J1 User
        // TODO: currently the emails are failing to fit the format (some are missing .com)
        // email: user.Email,
        roleId: user.UserRoleId,
        shortLoginId: user.CommunityNickname,
        // TODO: Include more attributes that are deemed valuable
      },
    },
  });
}
