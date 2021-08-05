import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    /**
     * Passport expects a validate() method with the following signature:
     * validate(username: string, password:string): any
     */
    validate(username: string, password: string): Promise<any>;
}
export {};
