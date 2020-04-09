import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {group} from '@angular/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  form: FormGroup;

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
    console.log(this.form);
    if (this.form.valid) {
      const FormData = {...this.form.value};
      console.log(FormData);
      this.form.reset();
    }
  }
}
class CustomValidators {
  static confirmPassword(password) {
    return (control: FormControl): { [key: string]: boolean } => {
      const confirmPassword = control.value;
      console.log(control);
      console.log(password);
      if (password !== confirmPassword) {
        return {confirmPass: true};
      }
      return null;
    };
  }
}
