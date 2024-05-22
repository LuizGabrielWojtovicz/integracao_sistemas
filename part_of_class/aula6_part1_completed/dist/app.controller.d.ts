export declare class AppController {
    private productClient;
    private userClient;
    constructor();
    accessProduct(name: string): Promise<any>;
    deleteProduct(name: string): Promise<any[]>;
    private getUserInformation;
}
