import 'module-alias/register';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { JsonPlaceholderTodoRepository } from './infrastructure/repositories/jsonPlaceholderTodoRepository.js';
import { TodoService } from './application/services/todoService.js';
import { z } from "zod";

const todoRepository = new JsonPlaceholderTodoRepository();
const todoService = new TodoService(todoRepository);

const server = new McpServer(
    {
        name: 'mcp-todo-server',
        version: '1.0.0',
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

server.registerTool('get_todo_by_id',
    {
        title: "Get Todo by ID",
        description: "Retrieve a todo item by its ID",
        inputSchema: { id: z.string() }
    },
    async ({ id }) => {
        // Check if ID is provided
        if (!id) {
            return {
                content: [{ type: 'text', text: 'Error: Todo ID is required' }],
                isError: true
            };
        }

        const todo = await todoService.getTodoById(id);
        return {
            content: [{ type: 'text', text: todo ? JSON.stringify(todo, null, 2) : 'Todo not found' }]
        };
    });

server.registerTool('create_todo',
    {
        title: "Create Todo",
        description: "Create a new todo item",
        inputSchema: { title: z.string(), completed: z.boolean().optional() }
    },
    async (args) => {
        const newTodo = await todoService.createTodo({
            title: args.title,
            completed: args.completed || false
        });
        return {
            content: [{ type: 'text', text: JSON.stringify(newTodo, null, 2) }]
        };
    });

server.registerTool('update_todo',
    {
        title: "Update Todo",
        description: "Update an existing todo item",
        inputSchema: {
            id: z.string(),
            title: z.string().optional(),
            completed: z.boolean().optional()
        },
    }, async (args) => {
        const updatedTodo = await todoService.updateTodo(args.id, {
            title: args.title,
            completed: args.completed
        });
        return {
            content: [{ type: 'text', text: updatedTodo ? JSON.stringify(updatedTodo, null, 2) : 'Todo not found' }]
        };
    });

server.registerTool('delete_todo',
    {
        title: "Delete Todo",
        description: "Delete a todo item by its ID",
        inputSchema: {
            id: z.string()
        },
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