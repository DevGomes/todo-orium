import { UserDTO } from './../../shared/models/UserDTO';
import { ToDoListDTO } from './models/ToDoListDTO';
import { TodoListService } from './services/todo-list.service';
import { AuthService } from './../../core/services/auth.service';
import { ToDoListItem } from './models/ToDoListItem';
import { ToDoList } from './models/ToDoList';
import { Component, OnInit } from '@angular/core';
import * as toastr from 'toastr';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoLists: Array<ToDoList> = [];
  public todoListModel!: ToDoList;
  public itemListCurrent: Array<string> = [];
  private currentUser!: UserDTO;

  constructor(
    private auth: AuthService,
    private todoListService: TodoListService) { }

  async ngOnInit(): Promise<void> {
    this.loadTodoListOfUser();
  }

  private async loadTodoListOfUser(): Promise<void> {
    this.currentUser = this.auth.getUserSession() || new UserDTO();
    const { data: { result } } = await this.todoListService.getTodoListByUser(this.currentUser?.id + "");
    this.todoLists = [];
    result.forEach((listDTO: ToDoListDTO) => {
      this.todoLists.push(new ToDoList().toModel(listDTO, this.currentUser));
    });
  }

  public initNewToDoList(): void {
    this.todoLists = [];
    this.itemListCurrent = [];
    this.itemListCurrent.push('');
    this.todoLists.push(this.createNewToDoListModel());
  }

  private createNewToDoListModel(name?: string): ToDoList {
    const todoListModel = new ToDoList();
    todoListModel.name = name || 'New ToDo List';
    todoListModel.items = [];
    todoListModel.userId = new User().toModel(this.currentUser);
    return todoListModel;
  }

  addItemList(indexCurrent: number): void {
    this.todoLists[indexCurrent].items?.push(new ToDoListItem(this.itemListCurrent[indexCurrent]));
    this.itemListCurrent[indexCurrent] = '';
  }

  deleteItem(indexToDoList: number, indexItemToRemove: number): void {
    this.todoLists[indexToDoList].items?.splice(indexItemToRemove, 1);
  }

  createNewToDoList(): void {
    if (this.todoLists.length == 0) {
      this.initNewToDoList();
    } else {
      this.todoLists.push(this.createNewToDoListModel());
    }
  }

  deleteToDoList(indexCurrent: number): void {
    this.todoLists.splice(indexCurrent, 1);
  }

  isInvalidList(): boolean {
    if (this.todoLists) {
      if (this.todoLists.length == 0) {
        return true;
      }
      for (const item of this.todoLists) {
        if (!item.name) {
          return true;
        }
      } 
    }
    return false;
  }

  isUpdateList(): boolean {
    return this.todoLists[0].id ? true : false;
  }

  async save(): Promise<void> {
    if (this.isUpdateList()) {
      await this.todoListService.updateTodoList(this.todoLists, this.currentUser.id || 0);
      toastr.success('List has updated successful');
    } else {
      await this.todoListService.saveTodoList(this.todoLists);
      toastr.success('List has saved successful');
    }
    await this.loadTodoListOfUser();
  }

}
