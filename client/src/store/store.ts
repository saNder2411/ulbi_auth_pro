import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import { API_URL } from '../http/API'
import { AuthResponse } from '../models/response/AuthResponse'
import { IUser } from '../models/User.interface'
import { AuthService } from '../services/Auth.Service'

export class Store {
	user: IUser | null = null
	isAuth: boolean = false
	isLoading: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(value: boolean) {
		this.isAuth = value
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setLoading(value: boolean) {
		this.isLoading = value
	}

	async login(data: { email: string; password: string }) {
		try {
			const response = await AuthService.login(data)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err)
		}
	}

	async register(data: { email: string; password: string }) {
		try {
			const response = await AuthService.register(data)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser(null)
		} catch (err) {
			console.log(err)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (err) {
			console.log(err)
		} finally {
			this.setLoading(false)
		}
	}
}
