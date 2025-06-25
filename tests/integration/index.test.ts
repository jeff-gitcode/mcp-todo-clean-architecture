import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('MCP Todo Server Integration Tests', () => {
    let client: Client;
    let transport: StdioClientTransport;

    beforeAll(async () => {
        const serverPath = path.resolve(__dirname, '../../build/index.js');
        client = new Client({
            name: "integration-test-client",
            version: "1.0.0"
        });
        transport = new StdioClientTransport({
            command: "node",
            args: [serverPath]
        });
        await client.connect(transport);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    afterAll(async () => {
        await transport.close();
    });

    it('should get all todos', async () => {
        const result = await client.callTool({ name: 'get_todos', arguments: {} });
        expect(result.content).toBeDefined();
        const content = result.content as { text: string }[];
        expect(content.length).toBeGreaterThan(0);
        const todos = JSON.parse(content[0].text);
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThan(0);
        expect(todos[0]).toHaveProperty('id');
        expect(todos[0]).toHaveProperty('title');
        expect(todos[0]).toHaveProperty('completed');
    });

    it('should get a todo by ID', async () => {
        const result = await client.callTool({ name: 'get_todo_by_id', arguments: { id: '1' } });
        expect(result.content).toBeDefined();
        const content = result.content as { text: string }[];
        const todo = JSON.parse(content[0].text);
        expect(todo).toHaveProperty('id');
        expect(todo).toHaveProperty('title');
        expect(todo).toHaveProperty('completed');
    });

    it('should return error when todo ID is not provided', async () => {
        const result = await client.callTool({ name: 'get_todo_by_id', arguments: { id: '' } });
        expect(result.isError).toBe(true);
        const content = result.content as { text: string }[];
        expect(content[0].text).toContain('Todo ID is required');
    });

    it('should create a new todo', async () => {
        const newTodoTitle = 'Integration Test Todo';
        const result = await client.callTool({
            name: 'create_todo'
            , arguments: {
                title: newTodoTitle,
                completed: false
            }
        });
        const content = result.content as { text: string }[];
        const newTodo = JSON.parse(content[0].text);
        expect(newTodo).toHaveProperty('id');
        expect(newTodo).toHaveProperty('title', newTodoTitle);
        expect(newTodo).toHaveProperty('completed', false);
    });

    it('should update an existing todo', async () => {
        const updatedTitle = 'Updated Todo Title';
        const result = await client.callTool({
            name: 'update_todo', arguments: {
                id: '1',
                title: updatedTitle,
                completed: true
            }
        });
        const content = result.content as { text: string }[];
        const updatedTodo = JSON.parse(content[0].text);
        expect(updatedTodo).toHaveProperty('id');
        expect(updatedTodo).toHaveProperty('title', updatedTitle);
        expect(updatedTodo).toHaveProperty('completed', true);
    });

    it('should delete a todo', async () => {
        const result = await client.callTool({ name: 'delete_todo', arguments: { id: '1' } });
        const content = result.content as { text: string }[];
        expect(content[0].text).toContain('Todo deleted successfully');
    });
});