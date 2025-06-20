export const deleteTodo = async (todoService: any, id: string) => {
    const result = await todoService.deleteTodo(id);
    return result;
};