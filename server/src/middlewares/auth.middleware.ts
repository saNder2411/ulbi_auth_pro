import { IMiddleware } from './middleware.interface'
import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { HttpError } from '../exception/http.error.class'
import { ITokenService } from '../token/token.service.interface'
import { IUserDTO } from '../user/dto/user.dto'

export class AuthMiddleware implements IMiddleware {
	constructor(private tokenService: ITokenService) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		try {
			const authorizationHeader = req.headers.authorization

			if (!authorizationHeader) {
				return next(HttpError.UnauthorizedError())
			}

			const [, accessToken] = authorizationHeader.split(' ')

			if (!accessToken) {
				return next(HttpError.UnauthorizedError())
			}

			const userData = this.tokenService.validateAccessToken<IUserDTO>(accessToken)

			if (!userData) {
				return next(HttpError.UnauthorizedError())
			}

			req.user = userData

			next()
		} catch (err) {
			return next(HttpError.UnauthorizedError())
		}
	}
}
