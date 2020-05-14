import { NgModule } from '@angular/core';
import { StatsComponent } from './stats.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StatsComponent
  ],
  bootstrap: [
    StatsComponent
  ]
})
export class StatsModule { }
