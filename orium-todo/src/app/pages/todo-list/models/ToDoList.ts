import { UserDTO } from './../../../shared/models/UserDTO';
import { BaseModel } from "src/app/shared/models/BaseModel";
import { User } from "src/app/shared/models/User";
import { ToDoListDTO } from "./ToDoListDTO";
import { ToDoListItem } from "./ToDoListItem";

export class ToDoList extends BaseModel {
    constructor(
        public name?: string,
        public userId?: User,
        public items?: Array<ToDoListItem>
    ) {
        super();
    }

    public toModel(list: ToDoListDTO, user: UserDTO): ToDoList {
        const todoListModel = new ToDoList();

        todoListModel.id = list.list_id;
        todoListModel.userId = new User().toModel(user);
        todoListModel.name = list.list_item[0].name;
        todoListModel.items = [];
        
        list.list_item.forEach(item => {
            todoListModel.items?.push(new ToDoListItem().toModel(item));
        });
        
        return todoListModel;
    }
}