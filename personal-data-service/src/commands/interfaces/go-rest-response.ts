import { PersonalData } from './personal-data';

class NotFoundMessage {
  message: string;
}
export class GoRestResponse {
  code: number;
  meta: unknown;
  data: PersonalData | NotFoundMessage;
}
