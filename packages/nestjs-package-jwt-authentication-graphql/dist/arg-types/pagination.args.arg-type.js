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
exports.PaginationArgs = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let PaginationArgs = class PaginationArgs {
    constructor() {
        this.skip = 0;
        this.take = 25;
    }
};
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "skip", void 0);
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    class_validator_1.Min(1),
    class_validator_1.Max(50),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "take", void 0);
PaginationArgs = __decorate([
    graphql_1.ArgsType()
], PaginationArgs);
exports.PaginationArgs = PaginationArgs;
//# sourceMappingURL=pagination.args.arg-type.js.map