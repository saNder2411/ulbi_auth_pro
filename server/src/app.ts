import 'reflect-metadata'

import { json } from 'body-parser'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { Server } from 'http'
import { inject, injectable } from 'inversify'

import { IConfigService } from './config/config.service.interface'
import { TYPES } from './types'
import { IUserController } from './user/user.controller.interface'
import { IExceptionFilter } from './exception/exception.filter.interface'

@injectable()
export class App {
	app: Express
	server: Server | null = null

	constructor(
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
	) {
		this.app = express()
	}

	useMiddleware() {
		this.app.use(express.json())
		this.app.use(cookieParser())
		this.app.use(cors({ credentials: true, origin: this.configService.get('CLIENT_URL') }))
	}

	useRoutes() {
		this.app.use('/api', this.userController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	async init() {
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()
		try {
			await mongoose.connect(this.configService.get('DB_URL'))

			this.server = this.app.listen(+this.configService.get('PORT'), () =>
				console.log(`Server run on: http://localhost:${this.configService.get('PORT')}`)
			)
		} catch (err) {
			console.log(err)
		}
	}

	close() {
		if (!this.server) return

		this.server.close()
	}
}
