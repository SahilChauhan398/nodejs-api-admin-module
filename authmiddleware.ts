// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role !== 'admin') return res.status(403).json({ message: 'Access forbidden.' });
    next();
};
