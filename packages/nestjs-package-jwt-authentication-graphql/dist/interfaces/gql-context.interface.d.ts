import { Request, Response } from 'express';
import { GqlContextPayload } from './gql-context-payload.interface';
export interface GqlContext {
    req: Request;
    res: Response;
    payload?: GqlContextPayload;
    connection: any;
}
