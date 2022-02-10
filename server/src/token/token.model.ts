import { Schema, model } from 'mongoose'

export interface TokenSchema {
	userId: Schema.Types.ObjectId
	refreshToken: string
}

export interface TokenDoc extends TokenSchema {
	_id: string
}

const TokenSchema = new Schema<TokenSchema>({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
})

export const TokenModel = model('Token', TokenSchema)

export type ITokenModel = typeof TokenModel
