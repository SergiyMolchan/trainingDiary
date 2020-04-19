import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { RegistrationService, NewUser } from './registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private  router: Router) { }

  form: FormGroup;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])}
    );
  }

  submit() {
    this.loading = true;
    if (this.form.valid) {
      const newUser: NewUser = {...this.form.value};
      this.registrationService.registration(newUser)
        .subscribe( () => {
          this.loading = false;
          this.form.reset();
          this.error = '';
          localStorage.setItem('login', newUser.login);
          this.router.navigate(['/authorization']);
        }, error => {
          this.error = error.error.message;
          this.loading = false;
        });
    }
  }
}

class CustomValidators {
  static confirmPassword(password) {
    return (control: FormControl): { [key: string]: boolean } => {
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return {confirmPass: true};
      }
      return null;
    };
  }
}
