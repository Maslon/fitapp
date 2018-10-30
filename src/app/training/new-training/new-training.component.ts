import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  avaliableExercises: Exercise[]
  idecko: string;
  subscription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises()
    this.subscription = this.trainingService.exercisesChanged.subscribe(excercises => {
      this.avaliableExercises = excercises
    })
  }

  onStartTraining(){
    this.trainingService.startExercise(this.idecko)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
