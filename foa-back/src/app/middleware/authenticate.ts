import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secret';

const authenticate: RequestHandler = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (!token) {
      res.status(401).json({ message: 'Access Denied' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, SECRET);
      console.log(decoded);
      (req as any).user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token' });
    }
};

export default authenticate;