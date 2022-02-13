import { IUser } from '../User.interface'

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
