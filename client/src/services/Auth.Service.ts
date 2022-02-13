import { AxiosResponse } from 'axios'

import { API } from '../http/API'
import { AuthResponse } from '../models/response/AuthResponse'

export class AuthService {
	static async register(data: { email: string; password: string }): Promise<AxiosResponse<AuthResponse>> {
		return await API.post<AuthResponse>(`/register`, data)
	}

	static async login(data: { email: string; password: string }): Promise<AxiosResponse<AuthResponse>> {
		return await API.post<AuthResponse>(`/login`, data)
	}

	static async logout(): Promise<void> {
		await API.post<AuthResponse>(`/logout`)
	}
}
