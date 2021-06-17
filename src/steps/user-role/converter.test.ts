import { createUserRoleEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createUserRoleEntity', () => {
  test('should convert to entity', () => {
    const role = {
      Id: 'roleid1',
      Name: 'Role Name',
      LastModifiedById: 'modified-id',
      ParentRoleId: 'parent-id',
      OpportunityAccessForAccountOwner: 'edit',
      CaseAccessForAccountOwner: 'edit',
      ContactAccessForAccountOwner: 'edit',
    } as StandardSchema['SObjects']['UserRole']['Fields'];

    const entity = createUserRoleEntity(role);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-user-role:roleid1',
        _type: 'salesforce_user_role',
        _class: ['AccessRole'],
        name: 'Role Name',
        id: 'roleid1',
        updatedBy: 'modified-id',
        parentRoleId: 'parent-id',
        opportunityAccessForAccountOwner: 'edit',
        caseAccessForAccountOwner: 'edit',
        contactAccessForAccountOwner: 'edit',
        _rawData: [
          {
            name: 'default',
            rawData: role,
          },
        ],
      }),
    );
  });
});
