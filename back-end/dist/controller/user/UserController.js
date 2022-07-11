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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const UserRepository_1 = require("src/domain/repository/UserRepository");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let UserController = class UserController {
    constructor() {
        this.userRepository = typeorm_typedi_extensions_1.Container.get(UserRepository_1.UserRepository);
    }
    hello() {
        return "Hello World";
    }
    world() {
        return this.userRepository.count();
    }
};
__decorate([
    (0, routing_controllers_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "hello", null);
__decorate([
    (0, routing_controllers_1.Get)("/world"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "world", null);
UserController = __decorate([
    (0, routing_controllers_1.JsonController)("/api/users"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map