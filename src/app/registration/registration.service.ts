import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface NewUser {
  login: string;
  password: string;
  confirmPassword: string;
}

@Injectable({providedIn: 'root'})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registration(newUser: object): Observable<NewUser> {
    return this.http.post<NewUser>('/api/auth/registration', newUser);
  }
}
