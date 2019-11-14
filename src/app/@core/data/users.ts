import { Observable } from 'rxjs';

export class User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  name: string;
  picture: string;
}

export class UserAuth {
  username?: string;
  password?: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
}
