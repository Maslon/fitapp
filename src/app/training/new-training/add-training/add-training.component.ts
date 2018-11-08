import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  }

  onAddNewExercise(form: NgForm){
    this.trainingService.addExercise(form.value.name, form.value.duration, form.value.calories)
    console.log(form.value.name, form.value.duration, form.value.calories)
  }
}
