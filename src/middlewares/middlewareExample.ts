import { Request, Response,NextFunction } from 'express';

interface CustomRequest extends Request{
    customProperty?: string;
}

export const firstMiddleware = (req:CustomRequest ,res:Response, next:NextFunction)=>{
    console.log("Hi from middleware");
    req.customProperty='custom here';
    next();
}

export const secondMiddleware = (req:CustomRequest ,res:Response, next:NextFunction)=>{
    res.setHeader('Content-Type','application/json');
    res.setHeader('Set-Cookie',['type=ninja','language=javascript']);
    next();
}