import { Component, OnInit} from '@angular/core';
import {AuthorizationService} from './authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})

export class AppComponent implements OnInit {
  title = 'trainingDiary';
  constructor(
    private authorizationService: AuthorizationService
  ) {}

  isAuth: boolean = this.authorizationService.isAuth();

  ngOnInit() {
    this.authorizationService.autoLogin();
  }
}
