export class PersonalDataTransformed {
  uuid: string;
  name: string;
  email: string;
  login: string;
  status: string;

  constructor(partial: Partial<PersonalDataTransformed>) {
    Object.assign(this, partial);
  }
}
