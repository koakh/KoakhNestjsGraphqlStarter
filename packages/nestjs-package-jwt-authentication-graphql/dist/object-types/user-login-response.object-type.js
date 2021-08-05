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
exports.UserLoginResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_object_type_1 = require("./user.object-type");
let UserLoginResponse = class UserLoginResponse {
};
__decorate([
    graphql_1.Field(type => user_object_type_1.User),
    class_validator_1.IsDefined(),
    __metadata("design:type", user_object_type_1.User)
], UserLoginResponse.prototype, "user", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "accessToken", void 0);
UserLoginResponse = __decorate([
    graphql_1.ObjectType()
], UserLoginResponse);
exports.UserLoginResponse = UserLoginResponse;
//# sourceMappingURL=user-login-response.object-type.js.map