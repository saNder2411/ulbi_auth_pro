import { NextFunction, Request, Response, Router } from 'express'
import { IMiddleware } from './middleware.interface'

export interface IControllerRoute {
	path: string
	methodKey: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	callback: (req: Request, res: Response, next: NextFunction) => void
	middlewares?: IMiddleware[]
}
