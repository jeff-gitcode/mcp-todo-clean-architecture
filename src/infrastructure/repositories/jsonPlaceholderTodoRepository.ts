import { Todo } from "@/domain/entities/todo";
import { TodoRepository } from "@/domain/repositories/todoRepository";


export class JsonPlaceholderTodoRepository implements TodoRepository {
    private apiUrl: string = 'https://jsonplaceholder.typicode.com/todos';

    public async findAll(): Promise<Todo[]> {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data.map((item: any) => new Todo(item.id, item.title, item.completed));
    }

    public async findById(id: string): Promise<Todo | null> {
        const response = await fetch(`${this.apiUrl}/${id}`);
        if (response.ok) {
            const data = await response.json();
            return new Todo(data.id, data.title, data.completed);
        }
        return null;
    }

    public async create(todo: Partial<Todo>): Promise<Todo> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        const data = await response.json();
        return new Todo(data.id, data.title, data.completed);
    }

    public async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (response.ok) {
            const data = await response.json();
            return new Todo(data.id, data.title, data.completed);
        }
        return null;
    }

    public async delete(id: string): Promise<boolean> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    }
}