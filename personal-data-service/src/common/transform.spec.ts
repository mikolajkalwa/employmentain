import { PersonalData } from '../commands/models/personal-data';
import { PersonalDataTransformed } from '../commands/models/personal-data-transformed';
import { transformPersonalData } from './transform';

jest.mock('uuid', () => ({
  v4: () => '23978e71-bd3c-4f01-aec5-f7011298aa10',
}));

describe('transformPersonalData', () => {
  it('should return properly modified structure', () => {
    const personalData = new PersonalData({
      id: 256,
      name: 'Devesh Patil',
      email: 'devesh_patil@kunde.co',
      gender: 'Male',
      status: 'Active',
      created_at: '2021-06-02T03:50:08.040+05:30',
      updated_at: '2021-06-02T03:50:08.040+05:30',
    });

    const expectedTransformedData = new PersonalDataTransformed({
      uuid: '23978e71-bd3c-4f01-aec5-f7011298aa10',
      name: 'Devesh Patil',
      email: 'devesh_patil@kunde.co',
      login: 'devesh_patil',
      status: 'Active',
    });

    const tranformedData = transformPersonalData(personalData);

    expect(tranformedData).toEqual(expectedTransformedData);
  });
});
