import { Response, Request } from 'express';

export interface GqlContext {
  req: Request;
  res: Response;
}
