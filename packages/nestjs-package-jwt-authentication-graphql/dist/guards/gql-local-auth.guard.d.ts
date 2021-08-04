import { CanActivate, ExecutionContext } from '@nestjs/common';
import { NestGraphqlAuthService } from '../auth.service';
export declare class GqlLocalAuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: NestGraphqlAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    /**
     * Passport expects a validate() method with the following signature: validate(username: string, password:string): any
     */
    validate(username: string, password: string): Promise<any>;
}
