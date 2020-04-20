import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from './authorization/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{
  title = 'trainingDiary';
  constructor(private authorizationService: AuthorizationService,) {
  }

  ngOnInit() {
    this.authorizationService.autoLogin();
  }
}
