interface User {
    username: string;
    tokenVersion: number;
}
export declare class AuthStore {
    store: User[];
    constructor();
    addUser(username: string, tokenVersion: number): User;
    getUser(username: string): User;
    getTokenVersion(username: string): number;
    incrementTokenVersion(username: string): number;
}
export {};
