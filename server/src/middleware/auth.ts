import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", function(err, decoded) {
      if (err) return res.sendStatus(403);
      req.user = decoded as JwtPayload; // Add user data to the request object
      return next();
    });
  }
  return res.sendStatus(401);

  
};