import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeNav = new EventEmitter<void>()
  isAuth = false
  subscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(authState => this.isAuth = authState)
  }

  closeSideNav(){
    this.closeNav.emit()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
