import { Todo } from "@/domain/entities/todo";
import { TodoRepository } from "@/domain/repositories/todoRepository";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    public async getAllTodos(): Promise<Todo[]> {
        return await this.todoRepository.findAll();
    }

    public async getTodoById(id: string): Promise<Todo | null> {
        return await this.todoRepository.findById(id);
    }

    public async createTodo(data: Partial<Todo>): Promise<Todo> {
        return await this.todoRepository.create(data);
    }

    public async updateTodo(id: string, data: Partial<Todo>): Promise<Todo | null> {
        return await this.todoRepository.update(id, data);
    }

    public async deleteTodo(id: string): Promise<boolean> {
        return await this.todoRepository.delete(id);
    }
}