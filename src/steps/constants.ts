import {
  StepEntityMetadata,
  StepRelationshipMetadata,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  USERS: 'fetch-users',
  USER_ROLES: 'fetch-user-roles',
  PERMISSION_SETS: 'fetch-permission-sets',
  BUILD_USER_ASSIGNED_PERMISSION_SETS: 'build-user-assigned-permission-sets',
  GROUPS: 'fetch-groups',
  BUILD_GROUP_RELATIONSHIPS: 'build-group-relationships',
  FETCH_USER_ROLE_TO_USER_ROLE_RELATIONSHIP:
    'fetch-user-role-to-user-role-relationship',
  PROFILES: 'fetch-profiles',
};

export const Entities: Record<
  'USER' | 'USER_ROLE' | 'PERMISSION_SET' | 'GROUP' | 'PROFILE',
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
  GROUP: {
    resourceName: 'Group',
    _type: 'salesforce_group',
    _class: ['Group'],
  },
  PROFILE: {
    resourceName: 'Profile',
    _type: 'salesforce_profile',
    _class: ['Account'],
  },
};

export const Relationships: Record<
  | 'USER_ASSIGNED_ROLE'
  | 'USER_ASSIGNED_PERMISSION_SET'
  | 'GROUP_HAS_USER'
  | 'GROUP_HAS_GROUP'
  | 'GROUP_ASSIGNED_USER_ROLE'
  | 'USER_ROLE_CONTAINS_USER_ROLE'
  | 'USER_HAS_PROFILE'
  | 'PROFILE_HAS_PERMISSION_SET',
  StepRelationshipMetadata
> = {
  USER_ASSIGNED_ROLE: {
    _type: 'salesforce_user_assigned_user_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.USER_ROLE._type,
  },
  USER_ASSIGNED_PERMISSION_SET: {
    _type: 'salesforce_user_assigned_permission_set',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.PERMISSION_SET._type,
  },
  GROUP_HAS_USER: {
    _type: 'salesforce_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  GROUP_HAS_GROUP: {
    _type: 'salesforce_group_has_group',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  GROUP_ASSIGNED_USER_ROLE: {
    _type: 'salesforce_group_assigned_user_role',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.USER_ROLE._type,
  },
  USER_ROLE_CONTAINS_USER_ROLE: {
    _type: 'salesforce_user_role_contains_user_role',
    sourceType: Entities.USER_ROLE._type,
    _class: RelationshipClass.CONTAINS,
    targetType: Entities.USER_ROLE._type,
  },
  USER_HAS_PROFILE: {
    _type: 'salesforce_user_has_profile',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PROFILE._type,
  },
  PROFILE_HAS_PERMISSION_SET: {
    _type: 'salesforce_profile_has_permission_set',
    sourceType: Entities.PROFILE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PERMISSION_SET._type,
  },
};
