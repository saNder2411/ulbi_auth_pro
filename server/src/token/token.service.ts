import 'reflect-metadata'

import { inject, injectable } from 'inversify'
import { sign, verify } from 'jsonwebtoken'
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

	public generateTokens<T extends object>(payload: T): { accessToken: string; refreshToken: string } {
		const accessToken = sign(payload, this.configService.get('JWT_ACCESS_SECRET'), { expiresIn: '15s' })
		const refreshToken = sign(payload, this.configService.get('JWT_REFRESH_SECRET'), { expiresIn: '30s' })

		return { accessToken, refreshToken }
	}

	public async saveToken(userId: Types.ObjectId, refreshToken: string): Promise<TokenDoc> {
		const tokenData = await this.tokenModel.findOne({ userId })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await this.tokenModel.create({ userId, refreshToken })
		return token
	}

	public async removeToken(refreshToken: string): Promise<number> {
		const tokenData = await this.tokenModel.deleteOne({ refreshToken })

		return tokenData.deletedCount
	}

	public async findToken(refreshToken: string): Promise<TokenDoc | null> {
		const tokenData = await this.tokenModel.findOne({ refreshToken })

		return tokenData
	}

	public validateAccessToken<T extends object = object>(token: string): T | null {
		try {
			const userData = verify(token, this.configService.get('JWT_ACCESS_SECRET'))
			return userData as T
		} catch (err) {
			return null
		}
	}

	public validateRefreshToken<T extends object = object>(token: string): T | null {
		try {
			const userData = verify(token, this.configService.get('JWT_REFRESH_SECRET'))
			return userData as T
		} catch (err) {
			return null
		}
	}
}
