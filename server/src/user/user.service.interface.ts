import { UserDoc } from './user.model'

export interface IUserService {
	register({ email, password }: { email: string; password: string }): Promise<UserDoc | null>

	getUsers(): Promise<string[]>
}
