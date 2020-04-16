import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {NewWorkoutComponent} from './new-workout/new-workout.component';
import {AuthorizationComponent} from './authorization/authorization.component';

const routes: Routes = [
  {path: '', component: NewWorkoutComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'new-workout', component: NewWorkoutComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
