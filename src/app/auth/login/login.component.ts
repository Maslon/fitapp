import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  isLoading = false
  private loadingSubscription: Subscription

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required)
    })
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state)
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  ngOnDestroy(){
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe()
    }
  }
  
}
