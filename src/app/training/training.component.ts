import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.ongoingExcercise.subscribe((exercise) => {
      if(exercise){
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false
      }
    })
  }

  // onTrainingStarted(){
  //   this.ongoingTraining = true;
  // }

  onTrainingEnded(){
    this.ongoingTraining = false;
  }
}
