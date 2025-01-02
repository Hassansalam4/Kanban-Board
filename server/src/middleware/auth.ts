import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
 const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_KEY||"", function(err, decoded) {
    // err
    // decoded undefined
  });
};