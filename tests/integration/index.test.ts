import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('MCP Todo Server Integration Tests', () => {
    let serverProcess: ChildProcessWithoutNullStreams;
    let client: Client;
    let transport: StdioClientTransport;

    beforeAll(async () => {
        // Start the server as a child process
        const serverPath = path.resolve(__dirname, '../../build/index.js');
        serverProcess = spawn('node', [serverPath], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        // Create client that communicates with the server through stdio
        client = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            }
        );


        // Create transport that spawns the server process
        transport = new StdioClientTransport({
            command: "node",
            args: [serverPath]
        });

        await client.connect(transport);

        // Log any errors for debugging
        serverProcess.stderr.on('data', (data) => {
            console.error(`Server error: ${data}`);
        });

        // Give the server some time to fully initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    afterAll(() => {
        // Clean up the server process
        if (serverProcess) {
            serverProcess.kill();
        }
    });

    it('should get all todos', async () => {
        const result = await client.callTool('get_todos', {});
        expect(result.content).toBeDefined();
        expect(result.content.length).toBeGreaterThan(0);

        // Parse the JSON text from response
        const todos = JSON.parse(result.content[0].text);
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThan(0);
        expect(todos[0]).toHaveProperty('id');
        expect(todos[0]).toHaveProperty('title');
        expect(todos[0]).toHaveProperty('completed');
    });

    it('should get a todo by ID', async () => {
        const result = await client.callTool('get_todo_by_id', { id: '1' });
        expect(result.content).toBeDefined();

        // Parse the JSON text from response
        const todo = JSON.parse(result.content[0].text);
        expect(todo).toHaveProperty('id', '1');
        expect(todo).toHaveProperty('title');
        expect(todo).toHaveProperty('completed');
    });

    it('should return error when todo ID is not provided', async () => {
        const result = await client.callTool('get_todo_by_id', { id: '' });
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toContain('Todo ID is required');
    });

    it('should create a new todo', async () => {
        const newTodoTitle = 'Integration Test Todo';
        const result = await client.callTool('create_todo', {
            title: newTodoTitle,
            completed: false
        });

        // Parse the JSON text from response
        const newTodo = JSON.parse(result.content[0].text);
        expect(newTodo).toHaveProperty('id');
        expect(newTodo).toHaveProperty('title', newTodoTitle);
        expect(newTodo).toHaveProperty('completed', false);
    });

    it('should update an existing todo', async () => {
        const updatedTitle = 'Updated Todo Title';
        const result = await client.callTool('update_todo', {
            id: '1',
            title: updatedTitle,
            completed: true
        });

        // Parse the JSON text from response
        const updatedTodo = JSON.parse(result.content[0].text);
        expect(updatedTodo).toHaveProperty('id', '1');
        expect(updatedTodo).toHaveProperty('title', updatedTitle);
        expect(updatedTodo).toHaveProperty('completed', true);
    });

    it('should delete a todo', async () => {
        const result = await client.callTool('delete_todo', { id: '1' });
        expect(result.content[0].text).toContain('Todo deleted successfully');
    });
});