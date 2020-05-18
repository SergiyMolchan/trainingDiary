import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TrainingHistoryComponent} from './training-history.component';

@NgModule({
  declarations: [TrainingHistoryComponent],
  imports: [SharedModule],
  bootstrap: [TrainingHistoryComponent]
})
export class TrainingHistoryModule { }
