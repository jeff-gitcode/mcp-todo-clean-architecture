import { Todo } from '@/domain/entities/todo';

describe('Todo Entity', () => {
    it('should create a Todo with the correct properties', () => {
        const todoData = {
            id: '1',
            title: 'Test Todo',
            completed: false,
        };

        const todo = new Todo(todoData.id, todoData.title, todoData.completed);

        expect(todo.id).toBe(todoData.id);
        expect(todo.title).toBe(todoData.title);
        expect(todo.completed).toBe(todoData.completed);
    });

    it('should toggle completed status', () => {
        const todo = new Todo(
            '1',
            'Test Todo',
            true,
        );

        expect(todo.completed).toBe(true);
    });
});