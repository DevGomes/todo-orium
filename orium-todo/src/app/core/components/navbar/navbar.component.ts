import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  userSingIn: string = '';

  constructor(
    private auth: AuthService,
    private route: Router,
    ) { }

  ngOnInit(): void {  }

  ngDoCheck(): void {
    this.userSingIn = this.auth.getUserSession()?.email || '';
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  public logout(): void {
    this.auth.logout();
    this.route.navigateByUrl('login');
  }

}
