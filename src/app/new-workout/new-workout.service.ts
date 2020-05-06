import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthorizationService} from '../authorization/authorization.service';

export interface Workout {
  userOfWeight: number;
  exercises: Exercise[];
  dateOfTraining: number;
}

export interface Exercise {
  title: string;
  muscleGroups: string[];
  exerciseApproaches?: ExerciseApproaches[];
}

export interface ExerciseApproaches {
  weight: number;
  reps: number;
}

export interface Exercises {
  customExercises: Exercise[];
}

@Injectable({providedIn: 'root'})
export class NewWorkoutService {
  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) {}

  userOfExercises = [];

  setCustomExercisesList(exercises) {
    this.userOfExercises = exercises;
  }

  getCustomExercisesList() {
    return this.userOfExercises;
  }

  options = {
    headers:  new HttpHeaders({
        'Authorization': this.authorizationService.token
    })
  };

  saveNewWorkout(workout: object): Observable<Workout> {
    return this.http.post<Workout>('/api/Workouts/saveWorkout', workout, this.options);
  }

  getWorkouts(): Observable <Workout[]> {
    return this.http.get<Workout[]>('/api/Workouts/getWorkouts', this.options);
  }

  createCustomExercise(exercise: Exercise): Observable<Exercises> {
    return this.http.post<Exercises>('/api/customExercises/createCustomExercises', exercise, this.options);
  }

  getCustomExercises(): Observable<Exercises> {
    return this.http.get<Exercises>('/api/customExercises/getCustomExercises', this.options);
  }
}
