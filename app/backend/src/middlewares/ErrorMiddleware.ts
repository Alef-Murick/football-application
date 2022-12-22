import * as express from 'express';

const errorMiddleware = (
  req: express.Request,
  {status, message } = req.body,
  res: express.Response,
  _next: express.NextFunction,
): express.Response => res.status(status || 500).json( message || 'unkown error' );

export default errorMiddleware;
