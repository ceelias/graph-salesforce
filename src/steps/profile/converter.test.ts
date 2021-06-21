import { createProfileEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createProfileEntity', () => {
  test('should convert to entity', () => {
    const profile = {
      Id: 'profileid1',
      Name: 'Profile Name',
      LastModifiedById: 'modified-id',
      CreatedById: 'created-id',
      Description: 'description',
      UserType: 'UserType',
    } as StandardSchema['SObjects']['Profile']['Fields'];

    const entity = createProfileEntity(profile);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-profile:profileid1',
        _type: 'salesforce_profile',
        _class: ['Account'],
        name: 'Profile Name',
        id: 'profileid1',
        updatedBy: 'modified-id',
        createdBy: 'created-id',
        description: 'description',
        userType: 'UserType',
        _rawData: [
          {
            name: 'default',
            rawData: profile,
          },
        ],
      }),
    );
  });
});
