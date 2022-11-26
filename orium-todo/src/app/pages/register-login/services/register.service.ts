import { IResultHttp } from './../../../shared/models/interfaces/IResultHttp';
import { HttpService } from './../../../shared/services/http.service';
import { User } from 'src/app/shared/models/User';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<User> {

  constructor(public override httpBase: HttpService) { 
    super('users', httpBase)
  }

  public registerUser(model: User): Promise<IResultHttp> {
    return this.httpBase.post(`${this.urlBase}`, model);
  }
}
