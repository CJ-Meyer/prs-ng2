import { User } from './user';

export class Request {
  
  id: number;
  user: User;
  requestNumber?: string;
  description: string;
  justification: string;
  dateNeeded: string;
  deliveryMode: string;
  status?: string;
  total?: number;
  submittedDate?: string;
  reasonForRejection?: string;

  constructor(
    id: number = 0,
    user: User = new User(),
    description: string = '',
    justification: string = '',
    dateNeeded: string = '',
    deliveryMode: string = ''
  ) {
    this.id = id;
    this.user = user;
    this.description = description;
    this.justification = justification;
    this.dateNeeded = dateNeeded;
    this.deliveryMode = deliveryMode;
  }
}
