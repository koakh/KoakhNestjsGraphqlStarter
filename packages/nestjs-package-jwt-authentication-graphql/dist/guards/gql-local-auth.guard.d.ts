import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
export declare class GqlLocalAuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    /**
     * Passport expects a validate() method with the following signature: validate(username: string, password:string): any
     */
    validate(username: string, password: string): Promise<any>;
}
