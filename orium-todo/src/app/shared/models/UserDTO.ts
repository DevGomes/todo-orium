

export class UserDTO {
    constructor(
        public id?: number,
        public email?: string,
        public date_created?: string,
        public password?: string
    ) {}
}