import { JsonPlaceholderTodoRepository } from '@/infrastructure/repositories/jsonPlaceholderTodoRepository';
import { Todo } from '@/domain/entities/todo';

global.fetch = jest.fn();

describe('JsonPlaceholderTodoRepository', () => {
    let repository: JsonPlaceholderTodoRepository;

    beforeEach(() => {
        repository = new JsonPlaceholderTodoRepository();
        (fetch as jest.Mock).mockReset();
    });

    describe('findAll', () => {
        it('should fetch all todos and map them to Todo instances', async () => {
            const mockTodos = [
                { id: 1, title: 'Test 1', completed: false },
                { id: 2, title: 'Test 2', completed: true }
            ];
            (fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockTodos)
            });

            const result = await repository.findAll();

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Todo);
            expect(result[0].id).toBe(1);
            expect(result[0].title).toBe('Test 1');
            expect(result[0].completed).toBe(false);
        });
    });

    describe('findById', () => {
        it('should fetch a todo by id and return a Todo instance if found', async () => {
            const mockTodo = { id: 1, title: 'Test', completed: true };
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockTodo)
            });

            const result = await repository.findById('1');

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
            expect(result).toBeInstanceOf(Todo);
            expect(result?.id).toBe(1);
            expect(result?.title).toBe('Test');
            expect(result?.completed).toBe(true);
        });

        it('should return null if the todo is not found', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false
            });

            const result = await repository.findById('999');
            expect(result).toBeNull();
        });
    });

    describe('create', () => {
        it('should POST a new todo and return the created Todo instance', async () => {
            const newTodo = { title: 'New Todo', completed: false };
            const createdTodo = { id: 3, title: 'New Todo', completed: false };
            (fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(createdTodo)
            });

            const result = await repository.create(newTodo);

            expect(fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/todos',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTodo)
                })
            );
            expect(result).toBeInstanceOf(Todo);
            expect(result.id).toBe(3);
            expect(result.title).toBe('New Todo');
            expect(result.completed).toBe(false);
        });
    });

    describe('update', () => {
        it('should PUT an updated todo and return the updated Todo instance if successful', async () => {
            const updatedTodo = { title: 'Updated', completed: true };
            const returnedTodo = { id: 1, title: 'Updated', completed: true };
            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(returnedTodo)
            });

            const result = await repository.update('1', updatedTodo);

            expect(fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/todos/1',
                expect.objectContaining({
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTodo)
                })
            );
            expect(result).toBeInstanceOf(Todo);
            expect(result?.id).toBe(1);
            expect(result?.title).toBe('Updated');
            expect(result?.completed).toBe(true);
        });

        it('should return null if update fails', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false
            });

            const result = await repository.update('1', { title: 'Fail' });
            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should DELETE a todo and return true if successful', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: true
            });

            const result = await repository.delete('1');

            expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
                method: 'DELETE'
            });
            expect(result).toBe(true);
        });

        it('should return false if delete fails', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false
            });

            const result = await repository.delete('1');
            expect(result).toBe(false);
        });
    });
});