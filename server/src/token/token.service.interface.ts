import { Types } from 'mongoose'
import { TokenDoc } from './token.model'

export interface ITokenService {
	generateTokens: <T extends object>(payload: T) => { accessToken: string; refreshToken: string }

	saveToken: (userId: Types.ObjectId, refreshToken: string) => Promise<TokenDoc>

	removeToken: (refreshToken: string) => Promise<number>

	findToken: (refreshToken: string) => Promise<TokenDoc | null>

	validateAccessToken: <T extends object = object>(token: string) => T | null

	validateRefreshToken: <T extends object = object>(token: string) => T | null
}
