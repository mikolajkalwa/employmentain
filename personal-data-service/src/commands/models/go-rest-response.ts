import { PersonalData } from './personal-data';

class ErrorMessage {
  message: string;
}
export class GoRestResponse {
  code: number;
  meta: unknown;
  data: PersonalData | ErrorMessage;
}
