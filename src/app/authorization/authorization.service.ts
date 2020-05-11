import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthData {
  login: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}


  get token(): string {
    return localStorage.getItem('token');
  }

  setToken(res) {
    const token = res.token;
    const expirationDate: Date = new Date(new Date().getTime() + res.timeLifeOfToken * 1000);
    localStorage.setItem('token', token);
    // @ts-ignore
    localStorage.setItem('expirationDate', expirationDate);
  }

  authorization(authData: object): Observable<any> {
    return this.http.post<AuthData>('/api/auth/login', authData)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.router.navigate(['/authorization']);
  }

  autoLogin() {
    if (this.isAuth()) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        this.logout();
      } else {
        // @ts-ignore
        this.autoLogout((expirationDate.getTime() - new Date()) / 1000);
        this.router.navigate(['/stats']);
      }
    } else {
      this.logout();
    }
  }

  autoLogout(time) {
    setTimeout(() => {
      this.logout();
    }, time * 1000);
  }

  isAuth(): boolean {
    return !!this.token;
  }
}
