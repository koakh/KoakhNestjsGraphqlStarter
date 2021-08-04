"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStore = void 0;
class AuthStore {
    constructor() {
        this.store = new Array();
    }
    addUser(username, tokenVersion) {
        if (!username) {
            throw new Error('invalid username');
        }
        this.store.push({ username, tokenVersion });
        return this.getUser(username);
    }
    getUser(username) {
        let user = this.store.find((e) => e.username === username);
        if (!user) {
            user = this.addUser(username, 0);
        }
        return user;
    }
    getTokenVersion(username) {
        const user = this.getUser(username);
        return user.tokenVersion;
    }
    incrementTokenVersion(username) {
        const user = this.getUser(username);
        return ++user.tokenVersion;
    }
}
exports.AuthStore = AuthStore;
