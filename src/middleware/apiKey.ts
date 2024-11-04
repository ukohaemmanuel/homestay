import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export const apiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is required' });
  }

  try {
    const key = await prisma.apiKey.findUnique({
      where: { key: apiKey as string },
      include: { tenant: true },
    });

    if (!key || !key.active) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    // Add tenant context to request
    (req as any).tenant = key.tenant;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};