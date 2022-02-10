import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import { NextFunction, Request, Response } from 'express'

import { BaseController } from '../common/base.controller'
import { IUserController } from './user.controller.interface'
import { TYPES } from '../types'
import { IUserService } from './user.service.interface'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.IConfigService) private configService: IConfigService
	) {
		super()

		this.bindRoutes([
			{
				path: '/register',
				methodKey: 'post',
				callback: this.register,
				middlewares: [],
			},
			{
				path: '/login',
				methodKey: 'post',
				callback: this.login,
				middlewares: [],
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
				middlewares: [],
			},
		])
	}
	public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (err) {}
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (err) {}
	}

	public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (err) {}
	}

	public async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (err) {}
	}

	public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (err) {}
	}

	public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.userService.getUsers()
			res.json(result)
		} catch (err) {}
	}
}
