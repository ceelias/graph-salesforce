import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { StandardSchema } from 'jsforce';

const USER_LOGIN_PREFIX = 'salesforce-group';
export function createGroupEntityIdentifier(login: string): string {
  return `${USER_LOGIN_PREFIX}:${login}`;
}

export function createGroupEntity(
  group: StandardSchema['SObjects']['Group']['Fields'],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _key: createGroupEntityIdentifier(group.Id), // Must be at least 10 chars long
        _type: Entities.GROUP._type,
        _class: Entities.GROUP._class,
        id: group.Id,
        name: group.Name || group.DeveloperName || '',
        createdOn: parseTimePropertyValue(group.CreatedDate),
        createdBy: group.CreatedById,
        updatedOn: parseTimePropertyValue(group.LastModifiedDate),
        updatedBy: group.LastModifiedById,
        // Custom Properties
        developerName: group.DeveloperName,
        relatedId: group.RelatedId,
        groupType: group.Type,
        ownerId: group.OwnerId,
        doesSendEmailToMembers: group.DoesSendEmailToMembers,
        doesIncludeBosses: group.DoesIncludeBosses,
        email: group.Email,
      },
    },
  });
}
