import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthData, AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {

  form: FormGroup;
  login: string = localStorage.getItem('login');
  loading = false;
  error = '';

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(this.login || '', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const authData: AuthData = {...this.form.value};
      this.authorizationService.authorization(authData)
        .subscribe(
          res => {
            this.authorizationService.autoLogout(res.timeLifeOfToken);
            this.loading = false;
            this.error = '';
            this.form.reset();
            this.router.navigate(['/new-workout']);
            localStorage.removeItem('login');
          }, error => {
            this.error =  error.error.message;
            this.loading = false;
            console.error(this.error);
          }
        );
    }
  }
}
