import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm){
    console.log(form)
  }
}
