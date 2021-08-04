"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.adminCurrentUser = void 0;
exports.adminCurrentUser = {
    userId: 'efeed3eb-c0a2-4b3e-816f-2a42ca8451b3',
    username: 'admin',
    roles: ['ROLE_USER', 'ROLE_ADMIN'],
};
class UserService {
    findOneByField(field, value, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: exports.adminCurrentUser.userId,
                username: exports.adminCurrentUser.username,
                roles: exports.adminCurrentUser.roles,
            };
        });
    }
}
exports.UserService = UserService;
