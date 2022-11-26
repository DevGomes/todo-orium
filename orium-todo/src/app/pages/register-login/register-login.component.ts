import { RegisterService } from './services/register.service';
import { User } from './../../shared/models/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import toastr from "toastr"

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  public newRegister!: User;

  constructor(
    public router: Router,
    private registerService: RegisterService) { }

  ngOnInit(): void {
    this.initUser();
  }

  private initUser(): void {
    this.newRegister = new User();
  }

  save(): void {
    this.registerService.registerUser(this.newRegister)
      .then(response => {
        let { success } = response;
        if (success) {
          toastr.success('User has save successful');
        }
      }).catch(() => {
        toastr.error(`Error, User doesn't have save `);
      }).finally(() => {
        this.initUser();
      });
  }

  navegateToSingIn(): void {
    this.router.navigateByUrl('/login');
  }

}
