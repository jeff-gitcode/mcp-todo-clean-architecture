import { Todo } from '../../../../src/domain/entities/todo';

describe('Todo Entity', () => {
    it('should create a Todo with the correct properties', () => {
        const todoData = {
            id: '1',
            title: 'Test Todo',
            completed: false,
        };

        const todo = new Todo(todoData);

        expect(todo.id).toBe(todoData.id);
        expect(todo.title).toBe(todoData.title);
        expect(todo.completed).toBe(todoData.completed);
    });

    it('should toggle completed status', () => {
        const todo = new Todo({
            id: '1',
            title: 'Test Todo',
            completed: false,
        });

        todo.toggleCompleted();

        expect(todo.completed).toBe(true);
    });

    it('should return the correct representation of the Todo', () => {
        const todo = new Todo({
            id: '1',
            title: 'Test Todo',
            completed: false,
        });

        expect(todo.toString()).toBe('Todo: Test Todo, Completed: false');
    });
});