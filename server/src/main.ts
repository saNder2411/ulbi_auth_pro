import { Container, ContainerModule, interfaces } from 'inversify'

import { App } from './app'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { ExceptionFilter } from './exception/exception.filter'
import { IExceptionFilter } from './exception/exception.filter.interface'
import { ITokenModel, TokenModel } from './token/token.model'
import { TokenService } from './token/token.service'
import { ITokenService } from './token/token.service.interface'
import { TYPES } from './types'
import { MailService } from './user/mail.service'
import { IMailService } from './user/mail.service.interface'
import { UserController } from './user/user.controller'
import { IUserController } from './user/user.controller.interface'
import { IUserModel, UserModel } from './user/user.model'
import { UserService } from './user/user.service'
import { IUserService } from './user/user.service.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserModel>(TYPES.IUserModel).toConstantValue(UserModel)
	bind<ITokenModel>(TYPES.ITokenModel).toConstantValue(TokenModel)
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope()
	bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope()
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope()
	bind<IMailService>(TYPES.IMailService).to(MailService).inSingletonScope()
	bind<ITokenService>(TYPES.ITokenService).to(TokenService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope()

	bind<App>(TYPES.App).to(App)
})

const bootstrap = async () => {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.App)
	await app.init()

	return { app, appContainer }
}

export const boot = bootstrap()
