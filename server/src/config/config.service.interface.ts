export interface IEnv {
	PORT: number
	DB_URL: string
	SECRET: string
}

export interface IConfigService {
	get: <K extends keyof IEnv>(key: K) => IEnv[K]
}
