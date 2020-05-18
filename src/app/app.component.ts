import { Component, OnInit} from '@angular/core';
import {AuthorizationService} from './authorization/authorization.service';
import {RouterOutlet} from '@angular/router';
import {routeChangeAnimation} from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [routeChangeAnimation]
})

export class AppComponent implements OnInit {
  title = 'trainingDiary';
  constructor(
    private authorizationService: AuthorizationService
  ) {}

  getRouteAnimationState(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  isAuth: boolean = this.authorizationService.isAuth();

  ngOnInit() {
    this.authorizationService.autoLogin();
  }
}
