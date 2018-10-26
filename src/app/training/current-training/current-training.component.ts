import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval;
  exercise: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.timerControl()
    this.exercise = this.trainingService.getRunningExercise()
  }

  timerControl(){
    const step = this.trainingService.getRunningExercise().duration / 100 *1000
    this.interval = setInterval(() => {
      this.progress = this.progress + 1
      if(this.progress >= 100){
        clearInterval(this.interval)
        this.trainingService.completeExercise()
      }
    }, step )
  }

  onStop(){
    clearInterval(this.interval)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress
    }})
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.timerControl()
      } else {
        this.trainingService.cancelExercise(this.progress)
      }
    })

  }

}
