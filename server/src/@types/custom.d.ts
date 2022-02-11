declare namespace Express {
	import { IUserDTO } from '../user/dto/user.dto'

	export interface Request {
		user?: IUserDTO
	}
}
