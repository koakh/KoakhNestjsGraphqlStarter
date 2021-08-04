import { Strategy } from 'passport-jwt';
import { NestGraphqlAuthOptions } from '../interfaces';
import { JwtValidatePayload } from '../interfaces/jwt-validate-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authModuleOptions;
    constructor(authModuleOptions: NestGraphqlAuthOptions);
    validate(payload: JwtValidatePayload): Promise<{
        userId: string;
        username: string;
        roles: string[];
    }>;
}
export {};
