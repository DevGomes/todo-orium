import { User } from 'src/app/shared/models/User';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import toastr from "toastr"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User();

  constructor(
    private auth: AuthService) { }

  ngOnInit(): void { }

  async singIn(): Promise<void> {
    const result = await this.auth.authenticate(this.user.email, this.user.password);
    if (!result.success) {
      toastr.error('Oops...invalid user or password');
    }
  }
}
