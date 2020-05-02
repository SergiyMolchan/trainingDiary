import {NgModule} from '@angular/core';
import {NewWorkoutComponent} from './new-workout.component';
import {SharedModule} from '../shared/shared.module';
import {CreateExerciseComponent} from './create-exercise/create-exercise.component';
import {ExerciseCardComponent} from './exercise-card/exercise-card.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NewWorkoutComponent,
    CreateExerciseComponent,
    ExerciseCardComponent
  ]
})

export  class NewWorkoutModule {
}
