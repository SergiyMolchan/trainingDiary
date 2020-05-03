import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Exercise, ExerciseApproaches, Exercises, NewWorkoutService, Workout} from './new-workout.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.sass']
})
export class NewWorkoutComponent implements OnInit {

  workoutForm: FormGroup;
  newExerciseFormIsActive = false;
  selectOfExerciseIsActive = false;
  selectOfExerciseValue = '';
  selectedExercise = {
    title: '',
    muscleGroups: [''],
    exerciseApproaches: []
  };
  loading = false;
  error = '';

  constructor(
    private newWorkoutService: NewWorkoutService
  ) { }

  newWorkout: Workout = {
    user: '',
    dateOfTraining: 0,
    exercises: [
      {
        title: 'Жым шаги',
        muscleGroups: ['Грудак', 'Предня дельта'],
        exerciseApproaches: [
          {
            weight: 100,
            reps: 10
          },
          {
            weight: 98,
            reps: 9
          }
        ]
      },
    ],
    userOfWeight: 0
  };

  exerciseApproaches: ExerciseApproaches = {
    weight: 0,
    reps: 0
  };

  exercise: Exercise = {
    title: '',
    muscleGroups: [''],
    exerciseApproaches: []
  };

  @ViewChild('selectOfExercise') insideElement;
  @ViewChild('selectOfExerciseInput') selectOfExerciseInput;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.selectOfExerciseIsActive === true) {
      const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      const menuBtn = this.selectOfExerciseInput.nativeElement;
      if (clickedInside) {
        this.onCloseSelectOfExercise();
      } else {
        if (targetElement !== menuBtn) {
          this.onCloseSelectOfExercise();
        }
      }
    }
  }

  ngOnInit(): void {
    this.newWorkoutService.getCustomExercises().subscribe(
      res => {
        console.log(res);
        this.newWorkoutService.setCustomExercisesList(res.customExercises);
      }
    );

    this.workoutForm = new FormGroup({
      dateOfTraining: new FormControl( '', [Validators.required]),
      exercises: new FormControl([], [Validators.required]),
      userOfWeight: new FormControl(0, [Validators.required])
    });
  }

  addExerciseApproaches = (indexOfExercise: number, exerciseApproaches: ExerciseApproaches) => {
    this.newWorkout.exercises[indexOfExercise].exerciseApproaches.push(exerciseApproaches);
  }

  addExercise() {
    this.newWorkout.exercises.push(this.selectedExercise);
    this.selectOfExerciseValue = '';
    // @ts-ignore
    this.selectedExercise = {...this.exercise};
  }

  saveNewWorkout() {
    console.log(this.newWorkout);
  }


  onOpenSelectOfExercise = () =>  this.selectOfExerciseIsActive = true;
  onCloseSelectOfExercise = () =>  this.selectOfExerciseIsActive = false;
  onOpenNewExerciseForm = () => this.newExerciseFormIsActive = true;
  onCloseNewExerciseForm = () => this.newExerciseFormIsActive = false;

  onSelectExercise(index: number) {
    const exercise = {...this.newWorkoutService.getCustomExercisesList()[index], exerciseApproaches: []};
    this.selectOfExerciseValue = exercise.title;
    this.selectedExercise = {...exercise};
  }

}
