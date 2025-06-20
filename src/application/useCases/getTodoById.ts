export const getTodoById = async (todoService: any, id: string) => {
    const todo = await todoService.getTodoById(id);
    return todo;
};