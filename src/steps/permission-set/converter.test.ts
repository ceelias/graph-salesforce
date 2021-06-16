import { createPermissionSetEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createUserRoleEntity', () => {
  test('should convert to entity', () => {
    const permSet = {
      Id: 'permSet1',
      Name: 'Perm Set',
    } as StandardSchema['SObjects']['PermissionSet']['Fields'];

    const entity = createPermissionSetEntity(permSet);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-permission-set:permSet1',
        _type: 'salesforce_permission_set',
        _class: ['AccessPolicy'],
        name: 'Perm Set',
        _rawData: [
          {
            name: 'default',
            rawData: permSet,
          },
        ],
      }),
    );
  });
});
