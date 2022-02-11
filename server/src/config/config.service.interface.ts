export interface IEnv {
	PORT: string
	DB_URL: string
	JWT_ACCESS_SECRET: string
	JWT_REFRESH_SECRET: string
	SALT: string
	SMTP_HOST: string
	SMTP_PORT: string
	SMTP_USER: string
	SMTP_PASSWORD: string
	API_URL: string
	CLIENT_URL: string
}

export interface IConfigService {
	get: <K extends keyof IEnv>(key: K) => IEnv[K]
}
