import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export interface AuthData {
  login: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  authorization(authData: object): Observable<any> {
    return this.http.post<AuthData>('/api/auth/login', authData)
      .pipe(
        tap(this.setToken),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  autoLogin() {
    if (this.isAuthentificated()) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()) {
        this.logout();
      } else {
        // @ts-ignore
        this.autoLogout((expirationDate.getTime() - new Date()) / 1000);
      }
    } else {
      this.logout();
    }
  }

  isAuthentificated(): boolean {
      return !!this.token;
  }

  autoLogout(time) {
    console.log(time);
    setTimeout(() => {
      this.logout();
    }, time * 1000);
  }

  private setToken(res) {
    const expirationDate: Date = new Date(new Date().getTime() + res.timeLifeOfToken * 1000);
    localStorage.setItem('token', res.token);
    // @ts-ignore
    localStorage.setItem('expirationDate', expirationDate);
  }
}
