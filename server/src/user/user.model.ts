import { Schema, model } from 'mongoose'

export interface UserSchema {
	email: string
	password: string
	isActivated: boolean
	activationLink: string
}

export interface UserDoc extends UserSchema {
	_id: string
}

const UserSchema = new Schema<UserSchema>({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String, required: true, default: '' },
})

export const UserModel = model('User', UserSchema)

export type IUserModel = typeof UserModel
