export class HttpError extends Error {
	constructor(public status: number, message: string, public errors: string[] | object[] = []) {
		super(message)
	}

	static UnauthorizedError() {
		return new HttpError(401, 'User is not authorize!')
	}

	static BadRequest(message: string, errors: string[] | object[]) {
		return new HttpError(400, message, errors)
	}
}
