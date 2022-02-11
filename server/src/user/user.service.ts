import 'reflect-metadata'

import { hash, compare } from 'bcryptjs'
import { inject, injectable } from 'inversify'
import { v4 } from 'uuid'

import { IConfigService } from '../config/config.service.interface'
import { ITokenService } from '../token/token.service.interface'
import { TYPES } from '../types'
import { UserDTO, UserReqDTO } from './dto/user.dto'
import { IMailService } from './mail.service.interface'
import { IUserModel } from './user.model'
import { IUserService, UserDataReturnValue } from './user.service.interface'
import { HttpError } from '../exception/http.error.class'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUserModel) private userModel: IUserModel,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IMailService) private mailService: IMailService,
		@inject(TYPES.ITokenService) private tokenService: ITokenService
	) {}

	public async register({ email, password }: UserReqDTO): UserDataReturnValue {
		const candidate = await this.userModel.findOne({ email })

		if (candidate) {
			throw HttpError.BadRequest(`User with this email: ${email} is already exists!`, [
				`User with this email: ${email} is already exists!`,
			])
		}

		const hashPassword = await hash(password, +this.configService.get('SALT'))

		const activationLink = v4()

		const user = await this.userModel.create({ email, password: hashPassword, activationLink })

		await this.mailService.sendActivationMail(
			email,
			`${this.configService.get('API_URL')}/api/activate/${activationLink}`
		)

		const userDTO = new UserDTO(user)
		const { accessToken, refreshToken } = this.tokenService.generateTokens({ ...userDTO })
		await this.tokenService.saveToken(userDTO._id, refreshToken)

		return { accessToken, refreshToken, user: userDTO }
	}

	public async activate(activationLink: string): Promise<void> {
		const user = await this.userModel.findOne({ activationLink })

		if (!user) {
			throw HttpError.BadRequest('Link is not correct!', ['Link is not correct!'])
		}

		user.isActivated = true
		await user.save()
	}

	public async login({ email, password }: UserReqDTO): UserDataReturnValue {
		const user = await this.userModel.findOne({ email })

		if (!user) {
			throw HttpError.BadRequest(`User with this email: ${email} is not exists!`, [
				`User with this email: ${email} is not exists!`,
			])
		}

		const isValidPass = await compare(password, user.password)

		if (!isValidPass) {
			throw HttpError.BadRequest(`This password: ${password} is not valid!`, [
				`This password: ${password} is not valid!`,
			])
		}

		const userDTO = new UserDTO(user)
		const { accessToken, refreshToken } = this.tokenService.generateTokens({ ...userDTO })
		await this.tokenService.saveToken(userDTO._id, refreshToken)

		return { accessToken, refreshToken, user: userDTO }


	}

	public async getUsers(): Promise<string[]> {
		return ['123', '456']
	}
}
