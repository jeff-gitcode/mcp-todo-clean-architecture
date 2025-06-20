import { TodoService } from '@/application/services/todoService';
import { Todo } from '@/domain/entities/todo';
// import { MCPServer } from '@modelcontextprotocol/sdk';


export class TodoHandlers {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    public async getTodos() {
        const todos: Todo[] = await this.todoService.getAllTodos();
        return todos;
    }

    public async getTodoById(id: string) {
        const todo: Todo | null = await this.todoService.getTodoById(id);
        return todo;
    }

    public async createTodo(data: Partial<Todo>) {
        const newTodo: Todo = await this.todoService.createTodo(data);
        return newTodo;
    }

    public async updateTodo(id: string, data: Partial<Todo>) {
        const updatedTodo: Todo | null = await this.todoService.updateTodo(id, data);
        return updatedTodo;
    }

    public async deleteTodo(id: string) {
        const result: boolean = await this.todoService.deleteTodo(id);
        return result;
    }
}