import type { Request, Response, NextFunction } from 'express'
import { getAdminSession } from './session.ts'

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']

  if (token && token === getAdminSession()) {
    next()
    return
  }

  res.status(401).json({
    success: false,
    message: 'Unauthorized'
  })
}
