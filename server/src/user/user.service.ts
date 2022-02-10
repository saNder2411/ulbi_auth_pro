import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { TYPES } from '../types'
import { IUserModel, UserDoc } from './user.model'
import { IUserService } from './user.service.interface'

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IUserModel) private userModel: IUserModel) {}

	public async register({ email, password }: { email: string; password: string }): Promise<UserDoc | null> {
		const candidate = await this.userModel.findOne({ email })

		if (candidate) {
			throw new Error(`User with this email: ${email} is already exists!`)
		}

		const user = await this.userModel.create({ email, password })

		return null
	}

	public async getUsers(): Promise<string[]> {
		return ['123', '456']
	}
}
