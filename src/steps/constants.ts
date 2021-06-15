import {
  StepEntityMetadata,
  StepRelationshipMetadata,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  USERS: 'fetch-users',
  USER_ROLES: 'fetch-user-roles',
};

export const Entities: Record<'USER' | 'USER_ROLE', StepEntityMetadata> = {
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
};

export const Relationships: Record<
  'USER_HAS_ROLE',
  StepRelationshipMetadata
> = {
  USER_HAS_ROLE: {
    _type: 'salesforce_user_has_user_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER_ROLE._type,
  },
};
