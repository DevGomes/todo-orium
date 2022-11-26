import { ToDoListItemDTO } from './ToDoListItemDTO';
import { BaseModel } from 'src/app/shared/models/BaseModel';

export class ToDoListItem extends BaseModel {
    constructor(
        public item?: string,
        public listId?: number,
    ) {
        super();
    }

    public toModel(todoListItemDTO: ToDoListItemDTO): ToDoListItem {
        const { item_id, item, list_id } = todoListItemDTO;
        this.id = item_id;
        this.item = item || "";
        this.listId = list_id;

        return this;
    }
}