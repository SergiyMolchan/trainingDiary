import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
})

export class CreateExerciseComponent implements OnInit {

  @Input() onCloseCreateExerciseComponent: any;

  newExerciseForm: FormGroup;
  muscleGroups: string[] = ['Legs', 'Back muscles', 'Biceps'];
  selectedMuscleGroups = [];
  loading = false;
  error = '';

  constructor(

  ) {}



  ngOnInit() {
    this.newExerciseForm = new FormGroup({
      muscleGroups: new FormControl([], [Validators.required]),
      exerciseName: new FormControl('', [])
    });
  }

  addMuscleGroups(params) {
    this.selectedMuscleGroups.push(params);
    this.selectedMuscleGroups = unique(this.selectedMuscleGroups);
  }

  saveExercise() {
    this.onCloseCreateExerciseComponent();
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
