

export class ToDoListItemDTO {

    constructor(
        public item?: string,
        public item_id?: number,
        public list_dt?: string,
        public list_id?: number,
        public name?: string
    ) {}
}
