import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Exercise, NewWorkoutService} from '../new-workout.service';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
})

export class CreateExerciseComponent implements OnInit {

  @Input() onCloseCreateExerciseComponent: any;

  newExerciseForm: FormGroup;
  muscleGroups: string[] = [
    'Legs',
    'quadriceps',
    'buttocks',
    'back muscles',
    'biceps',
    'triceps',
    'forearm muscles',
    'pectoral muscles',
    'abdominal muscles',
    'shoulders'
  ];
  selectedMuscleGroups: string[] = [];
  loading = false;
  error = '';

  constructor(
    private newWorkoutService: NewWorkoutService
  ) {}

  ngOnInit() {
    this.newExerciseForm = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  addMuscleGroups(params) {
    this.selectedMuscleGroups.push(params);
    this.selectedMuscleGroups = unique(this.selectedMuscleGroups);
  }

  saveExercise() {
    if (this.newExerciseForm.valid) {
      this.error = '';
      this.loading = true;
      const newExercise: Exercise = {muscleGroups: this.selectedMuscleGroups, ...this.newExerciseForm.value};
      this.newWorkoutService.createCustomExercise(newExercise).subscribe(
        res => {
          console.log(res);
          this.newWorkoutService.setCustomExercisesList(res.customExercises);
          this.loading = false;
          this.onCloseCreateExerciseComponent();
        }, error => {
          this.error =  error;
          this.loading = false;
          console.log(this.error);
        }
      );
    }
  }

}

function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}
