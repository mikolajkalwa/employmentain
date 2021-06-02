import { PersonalData } from '../commands/interfaces/personal-data';
import { PersonalDataTransformed } from '../commands/interfaces/personal-data-transformed';
import { v4 as uuidv4 } from 'uuid';

export const transformPersonalData = (
  personalData: PersonalData,
): PersonalDataTransformed => {
  return new PersonalDataTransformed({
    uuid: uuidv4(),
    email: personalData.email,
    login: personalData.email.substring(0, personalData.email.indexOf('@')),
    name: personalData.name,
    status: personalData.status,
  });
};
