import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { inject, injectable } from 'inversify'

import { BaseController } from '../common/base.controller'
import { IConfigService } from '../config/config.service.interface'
import { ValidateEmailMiddleware, ValidatePassMiddleware } from '../middlewares/validate.middleware'
import { TYPES } from '../types'
import { UserReqDTO } from './dto/user.dto'
import { IUserController } from './user.controller.interface'
import { IUserService } from './user.service.interface'
import { HttpError } from '../exception/http.error.class'
import { ITokenService } from '../token/token.service.interface'
import { AuthMiddleware } from '../middlewares/auth.middleware'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.ITokenService) private tokenService: ITokenService
	) {
		super()

		this.bindRoutes([
			{
				path: '/register',
				methodKey: 'post',
				callback: this.register,
				middlewares: [new ValidateEmailMiddleware(), new ValidatePassMiddleware()],
			},
			{
				path: '/login',
				methodKey: 'post',
				callback: this.login,
				middlewares: [new ValidateEmailMiddleware(), new ValidatePassMiddleware()],
			},
			{
				path: '/logout',
				methodKey: 'post',
				callback: this.logout,
				middlewares: [],
			},
			{
				path: '/activate/:link',
				methodKey: 'get',
				callback: this.activate,
				middlewares: [],
			},
			{
				path: '/refresh',
				methodKey: 'get',
				callback: this.refresh,
				middlewares: [],
			},
			{
				path: '/users',
				methodKey: 'get',
				callback: this.getUsers,
				middlewares: [new AuthMiddleware(this.tokenService)],
			},
		])
	}
	public async register(req: Request<{}, {}, UserReqDTO>, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(HttpError.BadRequest('Validation Error!', errors.array()))
			}

			const { email, password } = req.body

			const userData = await this.userService.register({ email, password })

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			this.ok(res, userData)
		} catch (err) {
			next(err)
		}
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(HttpError.BadRequest('Validation Error!', errors.array()))
			}

			const { email, password } = req.body

			const userData = await this.userService.login({ email, password })

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			this.ok(res, userData)
		} catch (err) {
			next(err)
		}
	}

	public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies

			const token = await this.userService.logout(refreshToken)

			res.clearCookie('refreshToken')

			this.ok(res, token)
		} catch (err) {
			next(err)
		}
	}

	public async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const activationLink = req.params.link
			await this.userService.activate(activationLink)
			res.redirect(this.configService.get('CLIENT_URL'))
		} catch (err) {
			next(err)
		}
	}

	public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies

			const userData = await this.userService.refresh(refreshToken)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			this.ok(res, userData)
		} catch (err) {
			next(err)
		}
	}

	public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const users = await this.userService.getUsers()
			this.ok(res, users)
		} catch (err) {
			next(err)
		}
	}
}
