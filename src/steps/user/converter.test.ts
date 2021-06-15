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
        roleId: 'roleid1',
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
