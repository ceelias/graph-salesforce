import { createGroupEntity } from './converter';
import { StandardSchema } from 'jsforce';

describe('#createGroupEntity', () => {
  test('should convert to entity', () => {
    const group = {
      Id: '00G5e000000FTRzEAO',
      Name: 'testing_double_nest',
      DeveloperName: 'testing_double_nest',
      RelatedId: '00E5e000000Q1xpEAC',
      Type: 'Role',
      Email: null,
      OwnerId: '00D5e000001CtEcEAK',
      DoesSendEmailToMembers: false,
      DoesIncludeBosses: true,
      CreatedDate: '2021-06-18T17:05:30.000+0000',
      CreatedById: '0055e000003CLIZAA4',
      LastModifiedDate: '2021-06-18T17:05:30.000+0000',
      LastModifiedById: '0055e000003CLIZAA4',
      SystemModstamp: '2021-06-18T17:19:59.000+0000',
    } as StandardSchema['SObjects']['Group']['Fields'];

    const entity = createGroupEntity(group);

    expect(entity).toEqual(
      expect.objectContaining({
        _key: 'salesforce-group:00G5e000000FTRzEAO',
        _type: 'salesforce_group',
        _class: ['Group'],
        id: '00G5e000000FTRzEAO',
        name: 'testing_double_nest',
        displayName: 'testing_double_nest',
        createdOn: 1624035930000,
        createdBy: '0055e000003CLIZAA4',
        updatedOn: 1624035930000,
        updatedBy: '0055e000003CLIZAA4',
        developerName: 'testing_double_nest',
        relatedId: '00E5e000000Q1xpEAC',
        groupType: 'Role',
        ownerId: '00D5e000001CtEcEAK',
        doesSendEmailToMembers: false,
        doesIncludeBosses: true,
        email: null,
        _rawData: [
          {
            name: 'default',
            rawData: group,
          },
        ],
      }),
    );
  });
});
