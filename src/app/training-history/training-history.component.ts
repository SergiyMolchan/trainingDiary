import { Component, OnInit } from '@angular/core';
import {NewWorkoutService, Workout} from '../new-workout/new-workout.service';

@Component({
  selector: 'app-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.sass']
})

export class TrainingHistoryComponent implements OnInit {
  error = '';
  loading = true;
  workouts: Workout[] = [];

  constructor(
    private newWorkoutService: NewWorkoutService
  ) { }

  ngOnInit(): void {
    this.newWorkoutService.getAllWorkouts().subscribe(res => {
        this.workouts = res.workouts;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = error;
        console.log(error);
      }
    );
  }

}
