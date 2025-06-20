export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        this.handleErrors(response);
        return response.json();
    }

    public async post<T>(endpoint: string, data: T): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        this.handleErrors(response);
        return response.json();
    }

    public async put<T>(endpoint: string, data: T): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        this.handleErrors(response);
        return response.json();
    }

    public async delete(endpoint: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
        });
        this.handleErrors(response);
    }

    private handleErrors(response: Response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}