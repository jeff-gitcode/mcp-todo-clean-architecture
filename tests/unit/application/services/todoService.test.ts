

describe('TodoService', () => {
    let todoService: TodoService;
    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        todoService = new TodoService(todoRepository);
    });

    it('should retrieve all todos', async () => {
        const todos: Todo[] = [{ id: '1', title: 'Test Todo', completed: false }];
        todoRepository.findAll = jest.fn().mockResolvedValue(todos);

        const result = await todoService.getAllTodos();
        expect(result).toEqual(todos);
        expect(todoRepository.findAll).toHaveBeenCalled();
    });

    it('should retrieve a todo by id', async () => {
        const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
        todoRepository.findById = jest.fn().mockResolvedValue(todo);

        const result = await todoService.getTodoById('1');
        expect(result).toEqual(todo);
        expect(todoRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should create a new todo', async () => {
        const newTodoData = { title: 'New Todo', completed: false };
        const newTodo: Todo = { id: '2', title: 'New Todo', completed: false };
        todoRepository.create = jest.fn().mockResolvedValue(newTodo);

        const result = await todoService.createTodo(newTodoData);
        expect(result).toEqual(newTodo);
        expect(todoRepository.create).toHaveBeenCalledWith(newTodoData);
    });

    it('should update an existing todo', async () => {
        const updatedTodoData = { title: 'Updated Todo' };
        const updatedTodo: Todo = { id: '1', title: 'Updated Todo', completed: false };
        todoRepository.update = jest.fn().mockResolvedValue(updatedTodo);

        const result = await todoService.updateTodo('1', updatedTodoData);
        expect(result).toEqual(updatedTodo);
        expect(todoRepository.update).toHaveBeenCalledWith('1', updatedTodoData);
    });

    it('should delete a todo', async () => {
        todoRepository.delete = jest.fn().mockResolvedValue(true);

        const result = await todoService.deleteTodo('1');
        expect(result).toBe(true);
        expect(todoRepository.delete).toHaveBeenCalledWith('1');
    });
});