import { Todo } from "@/domain/entities/todo.js";
import { TodoService } from "../services/todoService.js";


export const createTodo = async (todoService: TodoService, data: Partial<Todo>): Promise<Todo> => {
    const newTodo: Todo = await todoService.createTodo(data);
    return newTodo;
};