import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppbarComponent implements OnInit, OnChanges {

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  @Input() isAuth: boolean;
  logout: any = () => this.authorizationService.logout();

  ngOnChanges() {}

  ngOnInit(): void {}

}
