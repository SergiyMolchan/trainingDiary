import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../new-workout/new-workout.service';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
})

export class ExerciseCardComponent implements OnInit {

  isAddExerciseApproaches = false;

  @Input() exercise: Exercise;
  @Input() onAddExerciseApproaches: any;
  @Input() indexOfExercise: number;
  constructor(

  ) {}

  ngOnInit() {
  }

  onOpenAddExerciseApproachesFrom() {
    this.isAddExerciseApproaches = true;
  }

  allReps(exercise) {
    return exercise.exerciseApproaches.reduce((sum, currentApproaches) => sum + currentApproaches.reps, 0);
  }

  maxWeight(exercise) {
    if (exercise.exerciseApproaches.length > 0) {
      return Math.max.apply(Math, exercise.exerciseApproaches.map((exerciseApproaches) => exerciseApproaches.weight));
    } else {
      return 0;
    }
  }

}
