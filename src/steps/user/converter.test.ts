import { createUserEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createUserEntity', () => {
  test('should convert to entity', () => {
    const user = {
      Id: 'userid1',
      Name: 'User Name',
      Username: 'username',
      CommunityNickname: 'usernickname',
      UserRoleId: 'roleid1',
      CreatedById: 'createdid2',
      LastModifiedById: 'updatedbyid1',
      Email: 'useremail',
      ProfileId: 'profileid1',
      UserPermissionsMarketingUser: false,
      UserPermissionsOfflineUser: false,
      UserPermissionsCallCenterAutoLogin: false,
      UserPermissionsSFContentUser: false,
      UserPermissionsKnowledgeUser: false,
      UserPermissionsInteractionUser: false,
      UserPermissionsSupportUser: false,
      UserPermissionsAvantgoUser: false,
    } as StandardSchema['SObjects']['User']['Fields'];

    const entity = createUserEntity(user);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-user:userid1',
        _type: 'salesforce_user',
        _class: ['User'],
        username: 'username',
        shortLoginId: 'usernickname',
        name: 'User Name',
        id: 'userid1',
        createdBy: 'createdid2',
        updatedBy: 'updatedbyid1',
        userEmail: 'useremail',
        roleId: 'roleid1',
        profileId: 'profileid1',
        userPermissionsMarketingUser: false,
        userPermissionsOfflineUser: false,
        userPermissionsCallCenterAutoLogin: false,
        userPermissionsSFContentUser: false,
        userPermissionsKnowledgeUser: false,
        userPermissionsInteractionUser: false,
        userPermissionsSupportUser: false,
        userPermissionsAvantgoUser: false,
        _rawData: [
          {
            name: 'default',
            rawData: user,
          },
        ],
      }),
    );
  });
});
