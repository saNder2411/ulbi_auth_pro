import { Types } from 'mongoose'
import { TokenDoc } from './token.model'

export interface ITokenService {
	generateTokens: <T extends object>(payload: T) => { accessToken: string; refreshToken: string }

	saveToken: (userId: Types.ObjectId, refreshToken: string) => Promise<TokenDoc>
}
