import 'reflect-metadata'

import { config } from 'dotenv'
import { injectable } from 'inversify'

import { IConfigService, IEnv } from './config.service.interface'

@injectable()
export class ConfigService implements IConfigService {
	private config: IEnv | null = null

	constructor() {
		const result = config()

		if (result.error) console.error('[ConfigService] The file could not be read or is missing')

		if (result.parsed) {
			this.config = result.parsed as unknown as IEnv
			console.log('[ConfigService] Config .env uploaded')
		}
	}

	get<K extends keyof IEnv>(key: K): IEnv[K] {
		if (!this.config) {
			throw new Error('[ConfigService] The file could not be read or is missing')
		}

		return this.config[key]
	}
}
