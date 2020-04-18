import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {

  constructor() { }

  form: FormGroup;
  login: string = localStorage.getItem('login');
  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(this.login || '', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.form.valid) {
      const FormData = {...this.form.value};
      console.log(FormData);
      this.form.reset();
    }
  }
}
