import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { TodoService } from '@/application/services/todoService';
import { JsonPlaceholderTodoRepository } from '@/infrastructure/repositories/jsonPlaceholderTodoRepository';

const todoRepository = new JsonPlaceholderTodoRepository();
const todoService = new TodoService(todoRepository);

const server = new McpServer(
    {
        name: 'mcp-todo-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Register tools using the tool() method
server.tool('get_todos', 'Get all todos', {
    type: 'object',
    properties: {},
}, async () => {
    const todos = await todoService.getAllTodos();
    return {
        content: [{ type: 'text', text: JSON.stringify(todos, null, 2) }]
    };
});

server.tool('get_todo_by_id', 'Get a todo by ID', {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'Todo ID' }
    },
    required: ['id']
}, async (args) => {
    const todo = await todoService.getTodoById(args.id);
    return {
        content: [{ type: 'text', text: todo ? JSON.stringify(todo, null, 2) : 'Todo not found' }]
    };
});

server.tool('create_todo', 'Create a new todo', {
    type: 'object',
    properties: {
        title: { type: 'string', description: 'Todo title' },
        completed: { type: 'boolean', description: 'Todo completion status', default: false }
    },
    required: ['title']
}, async (args) => {
    const newTodo = await todoService.createTodo({
        title: args.title,
        completed: args.completed || false
    });
    return {
        content: [{ type: 'text', text: JSON.stringify(newTodo, null, 2) }]
    };
});

server.tool('update_todo', 'Update an existing todo', {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'Todo ID' },
        title: { type: 'string', description: 'Todo title' },
        completed: { type: 'boolean', description: 'Todo completion status' }
    },
    required: ['id']
}, async (args) => {
    const updatedTodo = await todoService.updateTodo(args.id, {
        title: args.title,
        completed: args.completed
    });
    return {
        content: [{ type: 'text', text: updatedTodo ? JSON.stringify(updatedTodo, null, 2) : 'Todo not found' }]
    };
});

server.tool('delete_todo', 'Delete a todo', {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'Todo ID' }
    },
    required: ['id']
}, async (args) => {
    const result = await todoService.deleteTodo(args.id);
    return {
        content: [{ type: 'text', text: result ? 'Todo deleted successfully' : 'Failed to delete todo' }]
    };
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Todo MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});