import request from 'supertest';
import { MCPServer } from '@modelcontextprotocol/sdk';
import { app } from '../../src/server'; // Adjust the import based on your server setup

describe('Integration Tests for Todo API', () => {
    let server: MCPServer;

    beforeAll(async () => {
        server = await app; // Assuming app is a promise that resolves to your MCPServer instance
    });

    afterAll(async () => {
        await server.close(); // Close the server after tests
    });

    it('should fetch all todos', async () => {
        const response = await request(server).get('/todos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a todo by ID', async () => {
        const response = await request(server).get('/todos/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('should create a new todo', async () => {
        const newTodo = { title: 'Test Todo', completed: false };
        const response = await request(server).post('/todos').send(newTodo);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', newTodo.title);
    });

    it('should update an existing todo', async () => {
        const updatedTodo = { title: 'Updated Todo', completed: true };
        const response = await request(server).put('/todos/1').send(updatedTodo);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('completed', true);
    });

    it('should delete a todo', async () => {
        const response = await request(server).delete('/todos/1');
        expect(response.status).toBe(204);
    });
});