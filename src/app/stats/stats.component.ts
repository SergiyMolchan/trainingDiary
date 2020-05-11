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
  trackProgressionBy: string = 'reps' //'weight'; // specify property name as argument
  dataForTableOfChart = [];
  drawChart = () => {

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', this.selectedExerciseTitle);
    // data.addColumn('number', 'Подтягивания')
    const selectedExercises = this.selectOfExercise(this.selectedExerciseTitle);
    console.log('selectedExercises', selectedExercises);
    const dataOfTable = this.workouts.map((workout, index) => {
      return [new Date(workout.dateOfTraining), selectedExercises[index][0].exerciseApproaches[0][this.trackProgressionBy]];
    });
    console.log('data: ', dataOfTable);
    data.addRows([
      ...dataOfTable
      // [new Date(this.workouts[0].dateOfTraining), this.workouts[0].exercises[0].exerciseApproaches[0].weight],
    ]);

    const options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
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
      }, error => console.log(error)
    );
  }

  selectOfExercise(title: string) {
    const selectedExercise = this.workouts.map(workout => {
      return workout.exercises.map(exercise => exercise.title === title ? exercise : {exerciseApproaches: [{weight: null, reps: null}]});
    });
    return selectedExercise;
  }

  ngOnInit(): void {
    this.fetchWorkouts();
  }

}
