"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const ProductClient_1 = require("./clients/ProductClient");
const UserClient_1 = require("./clients/UserClient");
let AppController = class AppController {
    constructor() {
        this.productClient = ProductClient_1.ProductClient.getInstance();
        this.userClient = UserClient_1.default.getInstance();
    }
    async accessProduct(name) {
        const { email, password } = await this.getUserInformation(name);
        await this.productClient.authenticationProcess(email, password);
        return (await this.productClient.products()).data;
    }
    async deleteProduct(name) {
        let response = [];
        const { email, password } = await this.getUserInformation(name);
        await this.productClient.authenticationProcess(email, password);
        await this.productClient.authenticationProcess(email, password);
        (await this.productClient.products()).data.forEach(async (element) => {
            if (element.price == '200.00') {
                response.push(await this.productClient.destroyer(element.id));
            }
        });
        return response;
    }
    async getUserInformation(name) {
        const resultOfUserClient = await this.userClient.find(name);
        const conditionToStattThisProces = resultOfUserClient &&
            resultOfUserClient.users &&
            resultOfUserClient.users.length > 0;
        if (!conditionToStattThisProces) {
            return {
                msg: 'User not found'
            };
        }
        const email = resultOfUserClient.users[0].email;
        const password = resultOfUserClient.users[0].password;
        return { email, password };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('access_products'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "accessProduct", null);
__decorate([
    (0, common_1.Delete)('delete_product_price200'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProduct", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], AppController);
//# sourceMappingURL=app.controller.js.map