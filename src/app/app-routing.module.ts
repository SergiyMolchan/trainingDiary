import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {NewWorkoutComponent} from './new-workout/new-workout.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {ProtectedRoutes} from './protected-routes.guard';
import {StatsComponent} from './stats/stats.component';

const routes: Routes = [
  {path: '', component: StatsComponent , canActivate: [ProtectedRoutes],  data: {animation: 'page1'}},
  {path: 'stats', component: StatsComponent , canActivate: [ProtectedRoutes],  data: {animation: 'page2'}},
  {path: 'new-workout', component: NewWorkoutComponent, canActivate: [ProtectedRoutes],  data: {animation: 'page1'}},
  {path: 'authorization', component: AuthorizationComponent, data: {animation: 'page2'}},
  {path: 'registration', component: RegistrationComponent, data: {animation: 'page1'}},
  {path: '**', redirectTo: '/', data: {animation: 'page2'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
