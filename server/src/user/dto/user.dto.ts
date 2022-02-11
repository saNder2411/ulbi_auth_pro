import { Types } from 'mongoose'

export interface IUserDTO {
	_id: Types.ObjectId
	email: string
	isActivated: boolean
}

export class UserDTO implements IUserDTO{
	_id: Types.ObjectId
	email: string
	isActivated: boolean

	constructor({ _id, email, isActivated }: { _id: Types.ObjectId; email: string; isActivated: boolean }) {
		this._id = _id
		this.email = email
		this.isActivated = isActivated
	}
}

export type UserReqDTO = { email: string; password: string }
