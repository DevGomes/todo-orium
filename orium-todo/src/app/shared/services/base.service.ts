import { IResultHttp } from './../models/interfaces/IResultHttp';
import { environment } from './../../../environments/environment';
import { HttpService } from './http.service';


export abstract class BaseService<T> {
    protected urlBase: string = '';

    constructor(
        public url: string,
        public httpBase: HttpService) {
        this.urlBase = `${environment.url_api}/${this.url}`;
    }

    public post(model: T): Promise<IResultHttp> {
        return this.httpBase.post(this.urlBase, model);
    }

    public get(): Promise<IResultHttp> {
        return this.httpBase.get(this.urlBase);
    }
}