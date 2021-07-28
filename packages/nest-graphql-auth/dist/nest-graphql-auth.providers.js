"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestGraphqlAuthProviders = void 0;
const constants_1 = require("./constants");
function createNestGraphqlAuthProviders(options) {
    return [
        {
            provide: constants_1.NEST_GRAPHQL_AUTH_OPTIONS,
            useValue: options,
        },
    ];
}
exports.createNestGraphqlAuthProviders = createNestGraphqlAuthProviders;
