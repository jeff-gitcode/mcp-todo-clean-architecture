export const getTodos = async (todoService: any) => {
    const todos = await todoService.getAllTodos();
    return todos;
};