import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:5000/api'

const API = axios.create({ withCredentials: true, baseURL: API_URL })

API.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	}

	return config
})

API.interceptors.response.use(
	(config) => config,
	async (err) => {
		const originalRequest = err.config
		if (err.response.status === 401 && originalRequest && !originalRequest._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
				localStorage.setItem('token', response.data.accessToken)
				return API.request(originalRequest)
			} catch (e) {
				console.log('User is not authorize', e)
			}
		}

		throw err
	}
)

export { API }
