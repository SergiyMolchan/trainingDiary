import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Exercise} from '../new-workout.service';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
})

export class ExerciseCardComponent implements OnInit {

  addExerciseApproachesForm: FormGroup;
  isAddExerciseApproaches = false;

  @Input() exercise: Exercise;
  @Input() onAddExerciseApproaches: any;
  @Input() indexOfExercise: number;
  constructor(

  ) {}

  ngOnInit() {
    this.addExerciseApproachesForm = new FormGroup({
      weight: new FormControl(0, [Validators.required, Validators.min(0)]),
      reps: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  onOpenAddExerciseApproachesFrom() {
    this.isAddExerciseApproaches = true;
  }

  saveExerciseApproaches() {
    if (this.addExerciseApproachesForm.valid) {
      this.onAddExerciseApproaches(this.indexOfExercise, this.addExerciseApproachesForm.value);
      this.isAddExerciseApproaches = false;
    }
  }


  addWeight(newWeight) {
    const oldExerciseApproachesForm = this.addExerciseApproachesForm.getRawValue();
    this.addExerciseApproachesForm.setValue({weight: oldExerciseApproachesForm.weight += newWeight, reps: oldExerciseApproachesForm.reps});
  }

  addReps(newReps) {
    const oldExerciseApproachesForm = this.addExerciseApproachesForm.getRawValue();
    this.addExerciseApproachesForm.setValue({weight: oldExerciseApproachesForm.weight, reps: oldExerciseApproachesForm.reps += newReps});
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
