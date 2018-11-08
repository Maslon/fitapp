import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ["date", "name", "duration", "calories", "state", "delete"]
  dataSource = new MatTableDataSource<Exercise>()
  subscription: Subscription
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchCompletedOrCancelledExercises()
    this.subscription = this.trainingService.finishedExercisesChanged.subscribe((exercises) => {
      this.dataSource.data = exercises
    })
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onDelete(id){
    this.trainingService.deletePastExercise(id)
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }


}
