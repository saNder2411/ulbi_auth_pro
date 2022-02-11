import 'reflect-metadata'

import { inject, injectable } from 'inversify'
import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'

import { IConfigService } from '../config/config.service.interface'
import { TYPES } from './../types'
import { ITokenModel, TokenDoc } from './token.model'
import { ITokenService } from './token.service.interface'

@injectable()
export class TokenService implements ITokenService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.ITokenModel) private tokenModel: ITokenModel
	) {}

	generateTokens<T extends object>(payload: T): { accessToken: string; refreshToken: string } {
		const accessToken = sign(payload, this.configService.get('JWT_ACCESS_SECRET'), { expiresIn: '30m' })
		const refreshToken = sign(payload, this.configService.get('JWT_REFRESH_SECRET'), { expiresIn: '30d' })

		return { accessToken, refreshToken }
	}

	async saveToken(userId: Types.ObjectId, refreshToken: string): Promise<TokenDoc> {
		const tokenData = await this.tokenModel.findOne({ userId })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await this.tokenModel.create({ userId, refreshToken })
		return token
	}
}
