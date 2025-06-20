export const updateTodo = async (todoService: any, id: string, data: Partial<any>) => {
    const updatedTodo = await todoService.updateTodo(id, data);
    return updatedTodo;
};