import { Todo } from "@/domain/entities/todo";
import { TodoService } from "../services/todoService";


export const createTodo = async (todoService: TodoService, data: Partial<Todo>): Promise<Todo> => {
    const newTodo: Todo = await todoService.createTodo(data);
    return newTodo;
};