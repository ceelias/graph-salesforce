import {
  StepEntityMetadata,
  StepRelationshipMetadata,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  USERS: 'fetch-users',
  USER_ROLES: 'fetch-user-roles',
  PERMISSION_SETS: 'fetch-permission-sets',
  BUILD_USER_HAS_PERMISSION_SETS: 'build-user-has-permission-sets',
};

export const Entities: Record<
  'USER' | 'USER_ROLE' | 'PERMISSION_SET',
  StepEntityMetadata
> = {
  USER: {
    resourceName: 'User',
    _type: 'salesforce_user',
    _class: ['User'],
  },
  USER_ROLE: {
    resourceName: 'UserRole',
    _type: 'salesforce_user_role',
    _class: ['AccessRole'],
  },
  PERMISSION_SET: {
    resourceName: 'PermissionSet',
    _type: 'salesforce_permission_set',
    _class: ['AccessPolicy'],
  },
};

export const Relationships: Record<
  'USER_HAS_ROLE' | 'USER_HAS_PERMISSION_SET',
  StepRelationshipMetadata
> = {
  USER_HAS_ROLE: {
    _type: 'salesforce_user_has_user_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER_ROLE._type,
  },
  USER_HAS_PERMISSION_SET: {
    _type: 'salesforce_user_has_permission_set',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PERMISSION_SET._type,
  },
};
