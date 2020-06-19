import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Exercise, NewWorkoutService, Workout} from '../new-workout/new-workout.service';
import menuAnim from '../shared/munuAnimation';
declare var google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
  animations: menuAnim
})
export class StatsComponent implements OnInit, AfterViewInit {
  menuAnimSelectOfExercise = 'hidden';
  menuAnimStateTrackProgressionBy = 'hidden';
  selectOfExerciseIsActive = false;
  selectTypeOfProgressIsActive = false;
  selectedExerciseTitle = '';
  trackProgressionBy = ''; // specify property name as argument
  loading = false;
  workouts: Workout[] = [];
  customExercises: string[] = [];
  zeroSetsOfExercise = false;

  @ViewChild('lineChart') lineChart: ElementRef;
  @ViewChild('selectOfExercise') insideElement;
  @ViewChild('selectOfExerciseInput') selectOfExerciseInput;
  @ViewChild('typeOfProgressInput') typeOfProgressInput;
  @ViewChild('selectOfTypeOfProgress') selectOfTypeOfProgress;

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

    if (this.selectTypeOfProgressIsActive === true) {
      const clickedInside = this.selectOfTypeOfProgress.nativeElement.contains(targetElement);
      const menuBtn = this.typeOfProgressInput.nativeElement;
      if (clickedInside) {
        this.onCloseSelectTypeOfProgress();
      } else {
        if (targetElement !== menuBtn) {
          this.onCloseSelectTypeOfProgress();
        }
      }
    }
  }
  constructor(
    private newWorkoutService: NewWorkoutService
  ) { }

  ngAfterViewInit() {
    this.fetchWorkouts();
  }

  ngOnInit(): void {
    this.loading = true;
    this.newWorkoutService.getCustomExercises().subscribe(
      res => {
        this.newWorkoutService.setCustomExercisesList(res.customExercises);
        this.customExercises = this.newWorkoutService.getCustomExercisesList();
      }, error => {
        console.log(error);
      }
    );
  }

  onOpenSelectOfExercise = () =>  {this.selectOfExerciseIsActive = true; this.menuAnimSelectOfExercise = 'show'};
  onCloseSelectOfExercise = () => { this.selectOfExerciseIsActive = false; this.menuAnimSelectOfExercise = 'hidden'};

  onSelectExercise(index: number) {
    this.zeroSetsOfExercise = false;
    const exercise = {...this.newWorkoutService.getCustomExercisesList()[index]};
    this.selectedExerciseTitle = exercise.title;
    setTimeout(() => this.renderChart(), 200); // fixing a bug, initial rendering was not full screen
  }

  onOpenSelectTypeOfProgress = () =>  {this.selectTypeOfProgressIsActive = true; this.menuAnimStateTrackProgressionBy = 'show'};
  onCloseSelectTypeOfProgress = () =>  {this.selectTypeOfProgressIsActive = false; this.menuAnimStateTrackProgressionBy = 'hidden'};

  onSelectTypeOfProgress(trackProgressionBy: string) {
    this.trackProgressionBy = trackProgressionBy;
    setTimeout(() => this.renderChart(), 200);  // fixing a bug, initial rendering was not full screen
  }

  fetchWorkouts() {
    this.newWorkoutService.getAllWorkouts().subscribe(res => {
        this.workouts = res.workouts;
        this.loading = false;
      }, error => console.log(error)
    );
  }

  renderChart() {
    if (this.selectedExerciseTitle) {
      const selectedExercises = this.selectOfExercise(this.selectedExerciseTitle);
      this.zeroSetsOfExercise = this.maximumNumberOfApproaches(selectedExercises) === 0;
      google.charts.load('current', {packages: ['line']});
      google.charts.setOnLoadCallback(this.drawChart);
    }
  }

  drawChart = () => {
    const selectedExercises = this.selectOfExercise(this.selectedExerciseTitle);
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    for (let i = 0; i < this.maximumNumberOfApproaches(selectedExercises); i++) {
      data.addColumn('number', `exercise approaches №${i + 1}`);
    }

    const dataOfTable = this.workouts.map((workout, index) => {
      return [new Date(workout.dateOfTraining), ...this.decomposeApproaches(this.formattingApproaches(selectedExercises), index) ];
    });

    data.addRows([
      ...dataOfTable
    ]);

    const options = {
      hAxis: {
        title: 'Date',
        format:  'MMM, yyyy, dd'
      },
      vAxis: {
        title: this.trackProgressionBy,
      },
    };

    const chart = new google.charts.Line(this.lineChart.nativeElement);
    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  selectOfExercise(title: string) {
    let selectedExercise: (Exercise | { exerciseApproaches: { reps: null; weight: null }[]; title: null })[][];
    selectedExercise = this.workouts.map(workout => {
      return workout.exercises.map(exercise => exercise.title === title ? exercise : {
        title: null,
        exerciseApproaches: [{weight: null, reps: null}]
      });
    });
    // @ts-ignore
    const exercises = selectedExercise.map(exercise => {
      if (exercise.length !== 1) {
        return exercise.filter(item => item.title === title);
      } else {
        return exercise;
      }
    });
    return exercises.map(exercise => exercise[0]);
  }

  maximumNumberOfApproaches(exercises?: (Exercise | { exerciseApproaches: { reps: null; weight: null }[] })[]) {
    let max = 0;
    try {
      exercises.forEach(exercise => {
        if (max < exercise.exerciseApproaches.length) {
          max = exercise.exerciseApproaches.length;
        }
      });
      return max;
    } catch (exception) {
      this.zeroSetsOfExercise = true;
      return max;
    }
  }

  formattingApproaches(exercises: (Exercise | { exerciseApproaches: { reps: null; weight: null }[] })[]) {
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

  decomposeApproaches(exercises: (Exercise | { exerciseApproaches: { reps: null; weight: null }[] })[], index: number) {
    const approachesResult = [];
    // @ts-ignore
    exercises[index].exerciseApproaches.map(exerciseApproach => approachesResult.push(exerciseApproach[this.trackProgressionBy]));
    return approachesResult;
  }
}
