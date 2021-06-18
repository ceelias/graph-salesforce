import { createPermissionSetEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createPermissionSetEntity', () => {
  test('should convert to entity', () => {
    const permSet = {
      //Partial representation of the permission set
      Id: 'permSet1',
      Name: 'Perm Set',
      Label: '00e5e000000EkD9AAK',
      LicenseId: '1005e000001eRsuAAE',
      ProfileId: '00e5e000000EkD9AAK',
      IsOwnedByProfile: true,
      IsCustom: false,
      PermissionsEmailSingle: false,
      PermissionsEmailMass: false,
      PermissionsEditTask: false,
      PermissionsEditEvent: false,
      PermissionsExportReport: false,
      PermissionsImportPersonal: false,
      PermissionsDataExport: false,
      PermissionsManageUsers: false,
      PermissionsEditPublicFilters: false,
      PermissionsEditPublicTemplates: false,
      PermissionsModifyAllData: false,
      PermissionsManageCases: false,
      PermissionsMassInlineEdit: false,
      PermissionsEditKnowledge: false,
    } as StandardSchema['SObjects']['PermissionSet']['Fields'];

    const entity = createPermissionSetEntity(permSet);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-permission-set:permSet1',
        _type: 'salesforce_permission_set',
        _class: ['AccessPolicy'],
        id: 'permSet1',
        name: 'Perm Set',
        label: '00e5e000000EkD9AAK',
        licenseId: '1005e000001eRsuAAE',
        profileId: '00e5e000000EkD9AAK',
        isOwnedByProfile: true,
        isCustom: false,
        permissionsEmailSingle: false,
        permissionsEmailMass: false,
        permissionsEditTask: false,
        permissionsEditEvent: false,
        permissionsExportReport: false,
        permissionsImportPersonal: false,
        permissionsDataExport: false,
        permissionsManageUsers: false,
        permissionsEditPublicFilters: false,
        permissionsEditPublicTemplates: false,
        permissionsModifyAllData: false,
        permissionsManageCases: false,
        permissionsMassInlineEdit: false,
        permissionsEditKnowledge: false,
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
