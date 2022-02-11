import { IMiddleware } from './middleware.interface'
import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'

export class ValidateEmailMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		body('email').isEmail()(req, res, next)
	}
}

export class ValidatePassMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		body('password').isLength({ min: 3, max: 32 })(req, res, next)
	}
}
