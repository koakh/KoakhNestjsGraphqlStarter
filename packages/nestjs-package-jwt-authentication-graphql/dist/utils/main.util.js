"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateArray = exports.newUuid = void 0;
const uuid_1 = require("uuid");
const newUuid = () => {
    return uuid_1.v4();
};
exports.newUuid = newUuid;
const paginateArray = (data, skip, take) => {
    for (let i = 0; i <= 4; i++) {
        data.push(data.slice(i * 2, i * 2 + 2));
    }
};
exports.paginateArray = paginateArray;
//# sourceMappingURL=main.util.js.map