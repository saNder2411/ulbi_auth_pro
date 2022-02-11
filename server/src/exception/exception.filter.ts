import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'

import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http.error.class'

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		console.log(err)
		if (err instanceof HttpError) {
			return res.status(err.status).json({ message: err.message, errors: err.errors })
		}

		res.status(500).send({ message: err.message })
	}
}
