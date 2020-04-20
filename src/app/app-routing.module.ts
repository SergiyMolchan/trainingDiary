import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {NewWorkoutComponent} from './new-workout/new-workout.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {ProtectedRoutes} from './protected-routes.guard';

const routes: Routes = [
  {path: '', component: NewWorkoutComponent, canActivate: [ProtectedRoutes]},
  {path: 'new-workout', component: NewWorkoutComponent, canActivate: [ProtectedRoutes]},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
