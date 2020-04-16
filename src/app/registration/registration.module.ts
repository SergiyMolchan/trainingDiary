import {NgModule} from '@angular/core';
import {RegistrationComponent} from './registration.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    SharedModule
  ],
  bootstrap: [
    RegistrationComponent
  ]
})

export class RegistrationModule {
}
