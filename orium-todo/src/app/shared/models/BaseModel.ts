
export abstract class BaseModel {
    id?: number;
    createdDate?: Date;
    markAsDelete = false as boolean;
}