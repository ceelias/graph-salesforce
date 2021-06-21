import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const PROFILE_PREFIX = 'salesforce-profile';
export function createProfileEntityIdentifier(id: string): string {
  return `${PROFILE_PREFIX}:${id}`;
}

export function createProfileEntity(
  profile: StandardSchema['SObjects']['Profile']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: profile,
      assign: {
        _key: createProfileEntityIdentifier(profile.Id), // Must be at least 10 chars long
        _type: Entities.PROFILE._type,
        _class: Entities.PROFILE._class,
        id: profile.Id,
        name: profile.Name,
        updatedOn: parseTimePropertyValue(profile.LastModifiedDate),
        updatedBy: profile.LastModifiedById,
        createdOn: parseTimePropertyValue(profile.CreatedDate),
        createdBy: profile.CreatedById,
        description: profile.Description || '',
        // Custom Properties
        // The profile object contains all the sames permissions that are
        // in the permission set so leaving those properties out of this
        userType: profile.UserType,
      },
    },
  });
}
