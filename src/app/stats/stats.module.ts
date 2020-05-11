import { NgModule } from '@angular/core';
import { StatsComponent } from './stats.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    SharedModule
  ],
  bootstrap: [
    StatsComponent
  ]
})
export class StatsModule { }
