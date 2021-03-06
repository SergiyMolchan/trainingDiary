import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import {AuthorizationModule} from './authorization/authorization.module';
import {SharedModule} from './shared/shared.module';
import {RegistrationModule} from './registration/registration.module';
import {NewWorkoutModule} from './new-workout/new-workout.module';
import {StatsModule} from './stats/stats.module';
import { TrainingHistoryComponent } from './training-history/training-history.component';
import {ExerciseCardComponent} from './training-history/exercise-card/exercise-card.component';

@NgModule({
    declarations: [
        AppComponent,
        AppbarComponent,
        TrainingHistoryComponent,
        ExerciseCardComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthorizationModule,
    RegistrationModule,
    NewWorkoutModule,
    StatsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
