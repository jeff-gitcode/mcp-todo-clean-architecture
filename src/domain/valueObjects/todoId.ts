export class TodoId {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid Todo ID');
        }
        this.value = value;
    }

    private isValid(value: string): boolean {
        // Basic validation for a Todo ID (e.g., non-empty string)
        return typeof value === 'string' && value.trim().length > 0;
    }

    public getValue(): string {
        return this.value;
    }
}