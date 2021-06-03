export class PersonalData {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  created_at: string;
  updated_at: string;

  constructor(partial: Partial<PersonalData>) {
    Object.assign(this, partial);
  }
}
