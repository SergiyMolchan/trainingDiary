import {NgModule} from '@angular/core';
import {NewWorkoutComponent} from './new-workout.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NewWorkoutComponent
  ]
})

export  class NewWorkoutModule {
}
