import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Exercise, ExerciseApproaches, Exercises, NewWorkoutService, Workout} from './new-workout.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import selectMenuAnim from '../shared/munuAnimation';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.sass'],
  animations: selectMenuAnim
})
export class NewWorkoutComponent implements OnInit {

  menuAnimState = 'hidden';
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
    public newWorkoutService: NewWorkoutService
  ) { }

  newWorkout: Workout = {
    dateOfTraining: Date.now(),
    exercises: [],
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
        this.newWorkoutService.setCustomExercisesList(res.customExercises);
      }, error => {
      console.log(this.error);
    }
    );

    this.workoutForm = new FormGroup({
      userOfWeight: new FormControl('', [Validators.required])
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
    this.newWorkout.userOfWeight = this.workoutForm.value.userOfWeight;
    console.log(this.newWorkout);

    if (this.workoutForm.valid || this.newWorkout.exercises.length !== 0) {
      this.error =  '';
      this.loading = true;
      this.newWorkoutService.saveNewWorkout(this.newWorkout).subscribe( res => {
        console.log(res);
        this.workoutForm.reset();
        this.loading = false;
        this.newWorkout = {
          dateOfTraining: Date.now(),
          exercises: [],
          userOfWeight: 0
        };
      }, error => {
        this.error =  error.error;
        this.loading = false;
        console.log(this.error);
      });
    }
  }


  onOpenSelectOfExercise = () =>  {this.selectOfExerciseIsActive = true; this.menuAnimState = 'show'};
  onCloseSelectOfExercise = () =>  {this.selectOfExerciseIsActive = false; this.menuAnimState = 'hidden'};
  onOpenNewExerciseForm = () => this.newExerciseFormIsActive = true;
  onCloseNewExerciseForm = () => this.newExerciseFormIsActive = false;

  onSelectExercise(index: number) {
    const exercise = {...this.newWorkoutService.getCustomExercisesList()[index], exerciseApproaches: []};
    this.selectOfExerciseValue = exercise.title;
    this.selectedExercise = {...exercise};
  }

}
