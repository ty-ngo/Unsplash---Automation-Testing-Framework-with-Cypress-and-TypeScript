class APIClient {
    private baseUrl: string;
    private headers: Record<string, string> = {};
    private auth: { username: string; password: string } | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public setBasicAuthentication(username: string, password: string): this {
        this.auth = { username, password };
        return this;
    }

    public setBearerToken(token: string): this {
        this.headers['Authorization'] = `Bearer ${token}`;
        return this;
    }

    public addHeader(name: string, value: string): this {
        this.headers[name] = value;
        return this;
    }

    public addContentTypeHeader(value: string): this {
        this.headers['Content-Type'] = value;
        return this;
    }

    public addAuthorizationHeader(value: string): this {
        this.headers['Authorization'] = value;
        return this;
    }

    public createRequest(url: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT', body?: any, params?: Record<string, any>) {
        return {
            url: `${this.baseUrl}${url}`,
            method: method,
            body: body,
            qs: params,
            headers: this.headers,
            auth: this.auth
        };
    }

    public executeGet(url: string, params?: Record<string, any>) {
        const requestOptions = this.createRequest(url, 'GET', undefined, params);
        return cy.request(requestOptions);
    }

    public executePost(url: string, body: any, params?: Record<string, any>) {
        const requestOptions = this.createRequest(url, 'POST', body, params);
        return cy.request(requestOptions);
    }

    public executeDelete(url: string, params?: Record<string, any>) {
        const requestOptions = this.createRequest(url, 'DELETE', undefined, params);
        return cy.request(requestOptions);
    }

    public executePut(url: string, body: any, params?: Record<string, any>) {
        const requestOptions = this.createRequest(url, 'PUT', body, params);
        return cy.request(requestOptions);
    }
}

export default APIClient;
