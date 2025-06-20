# mcp-todo-server/mcp-todo-server/README.md

# MCP Todo Server

This project is a demonstration of a clean architecture implementation using Node.js and TypeScript. It utilizes the MCPServer from the `@modelcontextprotocol/sdk` to create a server and manage todos through a JSON placeholder API.

## Project Structure

```
mcp-todo-server
├── src
│   ├── domain
│   │   ├── entities
│   │   │   └── todo.ts
│   │   ├── repositories
│   │   │   └── todoRepository.ts
│   │   └── valueObjects
│   │       └── todoId.ts
│   ├── application
│   │   ├── services
│   │   │   └── todoService.ts
│   │   └── useCases
│   │       ├── createTodo.ts
│   │       ├── deleteTodo.ts
│   │       ├── getTodoById.ts
│   │       ├── getTodos.ts
│   │       └── updateTodo.ts
│   ├── infrastructure
│   │   ├── repositories
│   │   │   └── jsonPlaceholderTodoRepository.ts
│   │   └── http
│   │       └── httpClient.ts
│   ├── presentation
│   │   └── handlers
│   │       └── todoHandlers.ts
│   ├── server.ts
│   └── index.ts
├── tests
│   ├── unit
│   │   ├── domain
│   │   │   └── entities
│   │   │       └── todo.test.ts
│   │   ├── application
│   │   │   └── services
│   │   │       └── todoService.test.ts
│   │   └── infrastructure
│   │       └── repositories
│   │           └── jsonPlaceholderTodoRepository.test.ts
│   └── integration
│       └── server.test.ts
├── http
│   └── todo-api.http
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mcp-todo-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the server:
   ```
   npm start
   ```

## Usage

The server exposes various endpoints for managing todos. You can use the provided `http/todo-api.http` file to test the API endpoints manually.

## Testing

To run the unit and integration tests, use the following command:
```
npm test
```

## License

This project is licensed under the MIT License.