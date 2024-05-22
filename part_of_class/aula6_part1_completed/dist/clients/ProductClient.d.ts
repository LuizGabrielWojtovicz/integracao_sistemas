export declare class ProductClient {
    private static instance;
    private url;
    private token;
    private constructor();
    static getInstance(): ProductClient;
    destroyer(id: number): Promise<any>;
    authenticationProcess(email: any, password: any): Promise<void>;
    products(): Promise<import("axios").AxiosResponse<any, any>>;
}
