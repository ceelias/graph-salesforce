import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_PREFIX = 'salesforce-user';
export function createUserEntityIdentifier(id: string): string {
  return `${USER_PREFIX}:${id}`;
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
        shortLoginId: user.CommunityNickname,
        id: user.Id,
        active: user.IsActive,
        createdOn: parseTimePropertyValue(user.CreatedDate),
        createdBy: user.CreatedById,
        updatedOn: parseTimePropertyValue(user.LastModifiedDate),
        updatedBy: user.LastModifiedById,
        userEmail: user.Email,
        userType: user.UserType,
        // Custom Properties
        roleId: user.UserRoleId,
        lastLoginDate: parseTimePropertyValue(user.LastLoginDate),
        lastPasswordChangeDate: parseTimePropertyValue(
          user.LastPasswordChangeDate,
        ),
        profileId: user.ProfileId,
        // User Object Permissions
        userPermissionsMarketingUser: user.UserPermissionsMarketingUser,
        userPermissionsOfflineUser: user.UserPermissionsOfflineUser,
        userPermissionsCallCenterAutoLogin:
          user.UserPermissionsCallCenterAutoLogin,
        userPermissionsSFContentUser: user.UserPermissionsSFContentUser,
        userPermissionsKnowledgeUser: user.UserPermissionsKnowledgeUser,
        userPermissionsInteractionUser: user.UserPermissionsInteractionUser,
        userPermissionsSupportUser: user.UserPermissionsSupportUser,
        userPermissionsAvantgoUser: user.UserPermissionsAvantgoUser,
      },
    },
  });
}
