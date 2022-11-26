import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { IResultHttp } from './../../shared/models/interfaces/IResultHttp';
import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import toastr from "toastr";
import * as CryptoJS from "crypto-js";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserDTO } from 'src/app/shared/models/UserDTO';

const helperJWT = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl!: string;
  private environmentAuth: any;


  constructor(
    private httpService: HttpService,
    private route: Router) {
    this.environmentAuth = environment.security;
    this.apiUrl = environment.url_api;
  }

  public async authenticate(email?: string, password?: string): Promise<IResultHttp> {
    const result = await this.httpService.post(`${this.apiUrl}/users/authenticate`, {
      email,
      password
    });

    const { data, success } = result;
    if (success) {
      this.setUserSession(data);
      this.navigateToTodo();
      toastr.success('Authenticated successful');
    }

    return result;
  }

  private navigateToTodo(): void {
    this.route.navigate(['todo']);
  }

  private setUserSession(response: any): void {
    localStorage.setItem(this.environmentAuth.key_token, this.encryptDatas(response.token));
    localStorage.setItem(this.environmentAuth.key_user, this.encryptDatas(JSON.stringify(response.user)));
  }

  private encryptDatas(data: any): string {
    try {
      return CryptoJS.AES.encrypt(data, this.environmentAuth.encrypt_secretKey).toString();
    } catch (e) {
      console.error(e);
    }

    return "";
  }

  private decryptDatas(data: any): string {
    try {
      const resultDataBytes = CryptoJS.AES.decrypt(data, this.environmentAuth.encrypt_secretKey);
      if (resultDataBytes.toString()) {
        return resultDataBytes.toString(CryptoJS.enc.Utf8);
      }
    } catch (e) {
      console.error(e);
    }
    return "";
  }

  private tryDecodeToken(): { success: boolean, decodeToken?: any } {
    try {
      const tokenUsuario = this.getUserToken();
      if (tokenUsuario) {
        const decodeToken = helperJWT.decodeToken(tokenUsuario);
        return {
          success: true,
          decodeToken
        }
      }
    } catch (e) {
      return {
        success: false
      }
    }
    return { success: false, decodeToken: null };
  }

  public getUserToken(): string {
    const encryptToken = localStorage.getItem(this.environmentAuth.key_token);

    if (!encryptToken) {
      return '';
    }

    return this.decryptDatas(encryptToken);
  }

  public getUserSession(): UserDTO | null {
    const encryptSessao = localStorage.getItem(this.environmentAuth.key_user);

    if (!encryptSessao) {
      return null;
    }

    return JSON.parse(this.decryptDatas(encryptSessao));
  }

  public isAuthenticated(): boolean {
    try {
      if (this.isValidToken() && !this.isTokenExpired() && this.getUserSession()) {
        return true;
      }
    } catch (e) {
      return false;
    }

    return false;
  }

  public isValidToken(): boolean {
    try {
      const decodeToken = this.tryDecodeToken();

      if (decodeToken.success) {
        const { exp, iat, user: { email, id } } = decodeToken.decodeToken;
        if (exp && iat && email && id) {
          return true
        }
      }
      return false
    } catch (e) {
      return false;
    }
  }

  public isTokenExpired(): boolean {
    return helperJWT.isTokenExpired(this.getUserToken());
  }

  public async logout(): Promise<void> {
    localStorage.clear();
    this.route.navigate(['login']);
  }

}
