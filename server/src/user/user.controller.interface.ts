import { Router, Request, Response, NextFunction } from 'express'

export interface IUserController {
	router: Router
	register(req: Request, res: Response, next: NextFunction): Promise<void>

	login(req: Request, res: Response, next: NextFunction): Promise<void>

	logout(req: Request, res: Response, next: NextFunction): Promise<void>

	activate(req: Request, res: Response, next: NextFunction): Promise<void>

	refresh(req: Request, res: Response, next: NextFunction): Promise<void>

	getUsers(req: Request, res: Response, next: NextFunction): Promise<void>
}
