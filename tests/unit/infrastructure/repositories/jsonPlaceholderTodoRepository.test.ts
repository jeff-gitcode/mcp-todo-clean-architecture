import { JsonPlaceholderTodoRepository } from '../../../../src/infrastructure/repositories/jsonPlaceholderTodoRepository';
import { Todo } from '../../../../src/domain/entities/todo';

describe('JsonPlaceholderTodoRepository', () => {
    let repository: JsonPlaceholderTodoRepository;

    beforeEach(() => {
        repository = new JsonPlaceholderTodoRepository();
    });

    it('should fetch all todos', async () => {
        const todos: Todo[] = await repository.findAll();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThan(0);
    });

    it('should fetch a todo by ID', async () => {
        const todoId = '1';
        const todo: Todo | null = await repository.findById(todoId);
        expect(todo).not.toBeNull();
        expect(todo?.id).toBe(todoId);
    });

    it('should create a new todo', async () => {
        const newTodoData = { title: 'New Todo', completed: false };
        const newTodo: Todo = await repository.create(newTodoData);
        expect(newTodo).toHaveProperty('id');
        expect(newTodo.title).toBe(newTodoData.title);
    });

    it('should update an existing todo', async () => {
        const todoId = '1';
        const updatedData = { title: 'Updated Todo', completed: true };
        const updatedTodo: Todo | null = await repository.update(todoId, updatedData);
        expect(updatedTodo).not.toBeNull();
        expect(updatedTodo?.title).toBe(updatedData.title);
    });

    it('should delete a todo', async () => {
        const todoId = '1';
        const result: boolean = await repository.delete(todoId);
        expect(result).toBe(true);
    });
});