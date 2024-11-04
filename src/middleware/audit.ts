import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const auditMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const oldJson = res.json;

  res.json = function (data) {
    const responseTime = Date.now() - start;
    const logData = {
      userId: (req as any).user?.id,
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      timestamp: new Date(),
    };

    // Log to database
    prisma.auditLog.create({
      data: logData,
    }).catch(console.error);

    return oldJson.call(this, data);
  };

  next();
};