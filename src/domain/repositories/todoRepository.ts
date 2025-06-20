import { Todo } from "../entities/todo";

export interface TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | null>;
    create(data: Partial<Todo>): Promise<Todo>;
    update(id: string, data: Partial<Todo>): Promise<Todo | null>;
    delete(id: string): Promise<boolean>;
}