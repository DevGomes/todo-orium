import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterLoginRoutingModule } from './register-login-routing.module';
import { RegisterLoginComponent } from './register-login.component';


@NgModule({
  declarations: [
    RegisterLoginComponent
  ],
  imports: [
    CommonModule,
    RegisterLoginRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class RegisterLoginModule { }
