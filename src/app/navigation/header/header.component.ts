import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() navToggle = new EventEmitter<void>()
  isAuth = false
  subscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe((authState) => {
      this.isAuth = authState;
    })
  }

  onNavToggle(){
    this.navToggle.emit()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
