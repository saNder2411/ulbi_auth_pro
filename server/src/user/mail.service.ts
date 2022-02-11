import 'reflect-metadata'

import { inject, injectable } from 'inversify'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailService } from './mail.service.interface'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class MailService implements IMailService {
	private transporter: Transporter

	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {
		this.configService
		const options = {
			host: this.configService.get('SMTP_HOST'),
			port: +this.configService.get('SMTP_PORT'),
			secure: false,
			auth: { user: this.configService.get('SMTP_USER'), pass: this.configService.get('SMTP_PASSWORD') },
		}

		this.transporter = nodemailer.createTransport(options as any)
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: this.configService.get('SMTP_USER'),
			to,
			subject: 'Activation account on ' + this.configService.get('API_URL'),
			text: '',
			html: `
			<div>
				<h2>To activate follow the link</h2>
				<a href="${link}">${link}</a>
			</div>
			`,
		})
	}
}
