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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const graphql_type_json_1 = require("graphql-type-json");
const graphql_1 = require("@nestjs/graphql");
const yup = require("yup");
const enums_1 = require("../enums");
//
let User = class User {
};
__decorate([
    graphql_1.Field(type => graphql_1.ID),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field(type => [String], { defaultValue: [enums_1.UserRoles.ROLE_USER] }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsDefined(),
    class_validator_1.Validate(yup.number),
    __metadata("design:type", Number)
], User.prototype, "createdDate", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], User.prototype, "createdBy", void 0);
__decorate([
    graphql_1.Field(type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], User.prototype, "metaData", void 0);
User = __decorate([
    graphql_1.ObjectType()
], User);
exports.User = User;
