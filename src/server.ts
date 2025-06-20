// import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// import { TodoHandlers } from './presentation/handlers/todoHandlers';
// import { TodoService } from './application/services/todoService';
// import { JsonPlaceholderTodoRepository } from './infrastructure/repositories/jsonPlaceholderTodoRepository';

// const todoRepository = new JsonPlaceholderTodoRepository();
// const todoService = new TodoService(todoRepository);
// const todoHandlers = new TodoHandlers(todoService);

// const server = new McpServer();

// server.registerTool('todos', todoHandlers);

// const PORT = process.env.PORT || 3000;

// server.start(PORT as number).then((): void => {
//     console.log(`Server is running on port ${PORT}`);
// }).catch((err: Error): void => {
//     console.error('Failed to start the server:', err);
// });