export default class UserClient {
    private static instance;
    private client;
    private constructor();
    static getInstance(): UserClient;
    find(name: string): Promise<{
        msg: string;
        users?: undefined;
    } | {
        msg: string;
        users: any;
    }>;
}
