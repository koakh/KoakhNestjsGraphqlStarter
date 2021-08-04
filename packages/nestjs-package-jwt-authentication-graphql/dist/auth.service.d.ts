import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';
import { UserServiceAbstract } from './abstracts';
import { AuthStore } from './auth.store';
import { GqlContextPayload, NestGraphqlAuthOptions, SignJwtTokenPayload } from './interfaces';
import { AccessToken } from './object-types';
interface INestGraphqlAuthService {
    validateUser(username: string, pass: string): Promise<any>;
    signJwtToken(signPayload: SignJwtTokenPayload, options?: JwtSignOptions): Promise<AccessToken>;
    signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: JwtSignOptions): Promise<AccessToken>;
    sendRefreshToken(res: Response, { accessToken }: AccessToken): void;
    getJwtPayLoad(token: string): GqlContextPayload;
    bcryptValidate(password: string, hashPassword: string): boolean;
}
export declare class NestGraphqlAuthService implements INestGraphqlAuthService {
    private readonly jwtService;
    private authModuleOptions;
    private readonly userService;
    private readonly logger;
    authStore: AuthStore;
    constructor(jwtService: JwtService, authModuleOptions: NestGraphqlAuthOptions, userService: UserServiceAbstract);
    validateUser(username: string, pass: string): Promise<any>;
    signJwtToken(signPayload: SignJwtTokenPayload, options?: JwtSignOptions): Promise<AccessToken>;
    signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: JwtSignOptions): Promise<AccessToken>;
    sendRefreshToken(res: Response, { accessToken }: AccessToken): void;
    getJwtPayLoad(token: string): GqlContextPayload;
    bcryptValidate(password: string, hashPassword: string): boolean;
}
export {};
