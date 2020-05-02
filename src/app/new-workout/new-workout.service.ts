import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Workout {
  user: string; // id of user
  userOfWeight: number;
  exercises: Exercise[];
  dateOfTraining: number;
}

export interface Exercise {
  title: string;
  muscleGroups: string[];
  exerciseApproaches: ExerciseApproaches[];
}

export interface ExerciseApproaches {
  weight: number;
  reps: number;
}

@Injectable({providedIn: 'root'})
export class NewWorkoutService {
  constructor(
    private http: HttpClient
  ) {}

  newWorkout(workout: object): Observable<Workout> {
    return this.http.post<Workout>('/api/auth/registration', workout);
  }
}
