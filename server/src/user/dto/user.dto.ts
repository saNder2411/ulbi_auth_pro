import { Types } from 'mongoose'

export class UserDTO {
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
