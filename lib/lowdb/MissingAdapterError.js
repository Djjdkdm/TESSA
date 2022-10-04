class MissingAdapterError extends Error {
    constructor() {
        super();
        this.message = 'Missing Adapter';
    }
}
T = { MissingAdapterError };
