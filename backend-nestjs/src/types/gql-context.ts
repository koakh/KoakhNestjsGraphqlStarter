import { Request, Response } from 'express';
import { GqlContextPayload } from './gql-context-payload';

export interface GqlContext {
  req: Request;
  res: Response;
  payload?: GqlContextPayload;
  // TODO: unknown type
  // required for subscription
  connection: any;
}
