import { IResultHttp } from './../models/interfaces/IResultHttp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import toastr from "toastr";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient) {
  }

  public post(url: string, model: any, options?: any): Promise<IResultHttp> {
    return new Promise(async (resolve) => {
      try {
        const response = await this.httpClient.post(`${url}`, model, options).toPromise();
        resolve({ success: true, data: response, error: undefined });
      } catch (error) {
        toastr.error('Happens a request error at post method');
        resolve({ success: false, data: undefined, error });
      }
    });
  }

  public get(url: string): Promise<IResultHttp> {
    return new Promise(async (resolve) => {
      try {
        const response = await this.httpClient.get(`${url}`).toPromise();
        resolve({ success: true, data: response, error: undefined });
      } catch (error) {
        toastr.error('Happens a request error at get method');
        resolve({ success: false, data: {}, error });
      }
    });
  }

  public put(url: string, model: any): Promise<IResultHttp> {
    return new Promise(async (resolve) => {
      try {
        const response = await this.httpClient.put(`${url}`, model).toPromise();
        resolve({ success: true, data: response, error: undefined });
      } catch (error) {
        toastr.error('Happens a request error at put method');
        resolve({ success: false, data: undefined, error });
      }
    });
  }
}
