import { UserDTO, UserReqDTO } from './dto/user.dto'

export type UserDataReturnValue = Promise<{ accessToken: string; refreshToken: string; user: UserDTO }>

export interface IUserService {
	register: (userDTO: UserReqDTO) => UserDataReturnValue

	login: (userDTO: UserReqDTO) => UserDataReturnValue

	activate: (activationLink: string) => Promise<void>

	getUsers: () => Promise<string[]>
}
