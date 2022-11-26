import { UserDTO } from './UserDTO';
import { BaseModel } from "./BaseModel";

export class User extends BaseModel {
    constructor(
        public email?: string,
        public password?: string,
    ) {
        super();
    }

    public toModel(userDTO: UserDTO): User {
        const { id, date_created, email, password } = userDTO;
        this.id = id;
        this.email = email,
        this.password = password;

        return this;
    }
}