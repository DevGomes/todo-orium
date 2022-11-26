import { ToDoListItemDTO } from "./ToDoListItemDTO";


export class ToDoListDTO {
    
    constructor(
        public list_id: number,
        public list_item: Array<ToDoListItemDTO>) {};
}