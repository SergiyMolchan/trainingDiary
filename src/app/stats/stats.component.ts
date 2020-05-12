import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Exercise, NewWorkoutService, Workout} from '../new-workout/new-workout.service';
declare var google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  workouts: Workout[] = [];

  @ViewChild('lineChart') lineChart: ElementRef;
  constructor(
    private newWorkoutService: NewWorkoutService
  ) { }

  customExercises = this.newWorkoutService.getCustomExercisesList();
  selectedExerciseTitle: string = 'подтягивания';
  trackProgressionBy: string = 'weight' //'weight'; // specify property name as argument
  dataForTableOfChart = [];
  drawChart = () => {
    console.log('custom exercises: ', this.customExercises)
    const selectedExercises = this.selectOfExercise(this.selectedExerciseTitle);
    console.log('selectedExercises', selectedExercises);

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    for(let i = 0; i < this.maximumNumberOfApproaches(selectedExercises); i++){
      data.addColumn('number', `exercise approaches №${i + 1}`);
    }
    // data.addColumn('number', 'Подтягивания')

    const dataOfTable = this.workouts.map((workout, index) => {
      return [new Date(workout.dateOfTraining), ...this.decomposeApproaches(this.formattingApproaches(selectedExercises), index) ]; // [0][this.trackProgressionBy]
    });
    console.log('data: ', dataOfTable);
    data.addRows([
      ...dataOfTable
      // [new Date(this.workouts[0].dateOfTraining), this.workouts[0].exercises[0].exerciseApproaches[0].weight],
    ]);

    const options = {
      chart: {
        title: this.selectedExerciseTitle,
        subtitle: 'in millions of dollars (USD)'
      },
      hAxis: {
        title: 'Date',
        format:  'MMM, yyyy, dd'
      },
      vAxis: {
        title: 'max weight',
      }
    };

    const chart = new google.charts.Line(this.lineChart.nativeElement);

    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  fetchWorkouts() {
    this.newWorkoutService.getAllWorkouts().subscribe(res => {
        this.workouts = res.workouts;
        console.log('Server data: ', this.workouts);
        google.charts.load('current', {packages: ['line']});
        google.charts.setOnLoadCallback(this.drawChart);
        this.decomposeApproaches(this.formattingApproaches(), 1);
      }, error => console.log(error)
    );
  }

  selectOfExercise(title: string) {
    const selectedExercise = this.workouts.map(workout => {
      return workout.exercises.map(exercise => exercise.title === title ? exercise : {exerciseApproaches: [{weight: null, reps: null}]});
    });
    return selectedExercise.map(exercise => exercise[0]);
  }

  maximumNumberOfApproaches(exercises: Exercise[] = []) {
    let max = 0;
    exercises.forEach(exercise => {
      if (max < exercise.exerciseApproaches.length) {
        max = exercise.exerciseApproaches.length;
      }
    });
    return max;
  }

  formattingApproaches() {
    const exercises = this.selectOfExercise(this.selectedExerciseTitle);
    const max = this.maximumNumberOfApproaches(exercises);
    exercises.map(exercise => {
      if (exercise.exerciseApproaches.length < max) {
        for (let i = 0; i < max; i++) {
          if (exercise.exerciseApproaches[i] === undefined) {
            exercise.exerciseApproaches.push({weight: null, reps: null});
          }
        }
      }
    });
    return exercises;
  }

  decomposeApproaches(exercises: Exercise[] = [], index: number) {
    const approachesResult = [];
    exercises[index].exerciseApproaches.map(exerciseApproach => approachesResult.push(exerciseApproach[this.trackProgressionBy]));
    return approachesResult;
  }

  ngOnInit(): void {
    this.fetchWorkouts();
  }

}
