import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
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
        id: role.Id,
        name: role.Name,
        updatedOn: parseTimePropertyValue(role.LastModifiedDate),
        updatedBy: role.LastModifiedById,
        // Custom Properties
        parentRoleId: role.ParentRoleId,
        opportunityAccessForAccountOwner: role.OpportunityAccessForAccountOwner,
        caseAccessForAccountOwner: role.CaseAccessForAccountOwner,
        contactAccessForAccountOwner: role.ContactAccessForAccountOwner,
      },
    },
  });
}
