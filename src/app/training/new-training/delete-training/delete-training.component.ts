import { Exercise } from './../../exercise.model';
import { TrainingService } from './../../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-training',
  templateUrl: './delete-training.component.html',
  styleUrls: ['./delete-training.component.css']
})
export class DeleteTrainingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["name", "duration", "calories", "delete"]
  dataSource = new MatTableDataSource<Exercise>()
  subscription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises()
    this. subscription = this.trainingService.exercisesChanged.subscribe(exercises => this.dataSource.data = exercises)
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onDelete(id){
    this.trainingService.deleteAvailableExercise(id)
    console.log(id)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe
  }

}
