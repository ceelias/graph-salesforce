import { createUserEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createUserEntity', () => {
  test('should convert to entity', () => {
    const user = {
      Id: 'userid1',
      Name: 'User Name',
      Username: 'username',
      CommunityNickname: 'usernickname',
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
