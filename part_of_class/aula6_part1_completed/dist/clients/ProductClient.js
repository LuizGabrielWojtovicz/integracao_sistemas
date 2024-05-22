"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductClient = void 0;
const axios_1 = require("axios");
class ProductClient {
    constructor() {
        this.url = 'http://localhost:3005/';
    }
    static getInstance() {
        if (!ProductClient.instance) {
            ProductClient.instance = new ProductClient();
        }
        return ProductClient.instance;
    }
    async destroyer(id) {
        return (await axios_1.default.delete(`${this.url}products?id=${id}`, {
            headers: {
                Authorization: this.token,
            }
        })).data;
    }
    async authenticationProcess(email, password) {
        this.token = (await axios_1.default.get(`${this.url}auth/login?email=${email}&password=${password}`)).data.token;
    }
    async products() {
        return await axios_1.default.get(`${this.url}products`, {
            headers: {
                Authorization: this.token,
            },
        });
    }
}
exports.ProductClient = ProductClient;
//# sourceMappingURL=ProductClient.js.map