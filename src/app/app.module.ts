import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import {AuthorizationModule} from './authorization/authorization.module';
import {SharedModule} from './shared/shared.module';
import {RegistrationModule} from './registration/registration.module';
import {NewWorkoutModule} from './new-workout/new-workout.module';

@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthorizationModule,
    RegistrationModule,
    NewWorkoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
