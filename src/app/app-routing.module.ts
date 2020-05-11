import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {NewWorkoutComponent} from './new-workout/new-workout.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {ProtectedRoutes} from './protected-routes.guard';
import {StatsComponent} from './stats/stats.component';

const routes: Routes = [
  {path: '', component: StatsComponent , canActivate: [ProtectedRoutes]},
  {path: 'stats', component: StatsComponent , canActivate: [ProtectedRoutes]},
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
