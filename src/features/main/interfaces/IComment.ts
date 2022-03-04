import { IAuthor } from "./IAuthor";

export interface IComment {
    id: string;
    parentId?: string;
    author: IAuthor;
    text: string;
    timestamp: number;
}