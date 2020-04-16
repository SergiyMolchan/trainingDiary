import {NgModule} from '@angular/core';
import {AuthorizationComponent} from './authorization.component';
import {SharedModule} from '../shared/shared.module';

@NgModule(
  {
    imports: [
      SharedModule
    ],
    declarations: [
      AuthorizationComponent,
    ],
    bootstrap: [
      AuthorizationComponent
    ],
  }
)
export class AuthorizationModule {
}
