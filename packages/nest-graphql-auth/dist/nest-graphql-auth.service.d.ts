import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';
import { GqlContextPayload, NestGraphqlAuthOptions, SignJwtTokenPayload } from './interfaces';
import { AuthStore } from './nest-graphql-auth.store';
import { AccessToken } from './object-types';
interface INestGraphqlAuthService {
    test(): Promise<any>;
}
export declare class NestGraphqlAuthService implements INestGraphqlAuthService {
    private authModuleOptions;
    private readonly jwtService;
    private readonly logger;
    private readonly userService;
    authStore: AuthStore;
    constructor(authModuleOptions: NestGraphqlAuthOptions, jwtService: JwtService);
    test(): Promise<any>;
    validateUser(username: string, pass: string): Promise<any>;
    signJwtToken(signPayload: SignJwtTokenPayload, options?: JwtSignOptions): Promise<AccessToken>;
    signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: JwtSignOptions): Promise<AccessToken>;
    sendRefreshToken(res: Response, { accessToken }: AccessToken): void;
    getJwtPayLoad(token: string): GqlContextPayload;
    bcryptValidate: (password: string, hashPassword: string) => boolean;
}
export {};
