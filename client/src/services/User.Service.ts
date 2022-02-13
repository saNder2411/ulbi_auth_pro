import { AxiosResponse } from 'axios'

import { API } from '../http/API'
import { IUser } from '../models/User.interface'

export class UserService {
	static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return await API.get<IUser[]>(`/users`)
	}
}
