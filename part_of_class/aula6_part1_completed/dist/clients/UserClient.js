"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class UserClient {
    constructor() {
        this.client = axios_1.default.create({
            baseURL: 'http://localhost:3004',
            timeout: 5000,
        });
    }
    static getInstance() {
        if (UserClient.instance === undefined) {
            UserClient.instance = new UserClient();
        }
        return UserClient.instance;
    }
    async find(name) {
        const queryString = name ? `?name=${name}` : '';
        const response = await this.client.get(`/users${queryString}`);
        return response.data.length === 0
            ? { msg: 'No products found' }
            : {
                msg: 'User found',
                users: response.data.map((user) => {
                    delete user.createdAt;
                    delete user.updatedAt;
                    return user;
                })
            };
    }
}
exports.default = UserClient;
//# sourceMappingURL=UserClient.js.map