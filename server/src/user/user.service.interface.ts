import { IUserDTO, UserReqDTO } from './dto/user.dto'
import { UserDoc } from './user.model'

export type UserDataReturnValue = Promise<{ accessToken: string; refreshToken: string; user: IUserDTO }>

export interface IUserService {
	register: (userDTO: UserReqDTO) => UserDataReturnValue

	login: (userDTO: UserReqDTO) => UserDataReturnValue

	logout: (refreshToken: string) => Promise<number>

	activate: (activationLink: string) => Promise<void>

	refresh: (refreshToken: string) => UserDataReturnValue

	getUsers: () => Promise<UserDoc[]>
}
