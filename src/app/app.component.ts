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
  constructor(
    private authorizationService: AuthorizationService
  ) {}
  title = 'trainingDiary';

  isAuth: boolean = this.authorizationService.isAuth();

  getRouteAnimationState(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  ngOnInit() {
    this.authorizationService.autoLogin();
  }
}
