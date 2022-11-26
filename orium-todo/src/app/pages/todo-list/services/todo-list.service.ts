import { IResultHttp } from './../../../shared/models/interfaces/IResultHttp';
import { HttpService } from './../../../shared/services/http.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { Injectable } from '@angular/core';
import { ToDoList } from '../models/ToDoList';

@Injectable({
  providedIn: 'root'
})
export class TodoListService extends BaseService<ToDoList> {

  constructor(public override httpBase: HttpService) { 
    super('list-todo', httpBase)
  }

  public getTodoListByUser(userId: string): Promise<IResultHttp> {
    return this.httpBase.get(`${this.urlBase}/${userId}`);
  }

  public saveTodoList(todoList: Array<ToDoList>): Promise<IResultHttp> {
    return this.httpBase.post(`${this.urlBase}`, todoList);
  }

  public updateTodoList(todoList: Array<ToDoList>, userId: number): Promise<IResultHttp> {
    return this.httpBase.put(`${this.urlBase}/${userId}`, todoList);
  }
}
