import { ExceptionMessage } from "../enums/enums";

class InvalidCredentialsError extends Error {
	public constructor(message = ExceptionMessage.BAD_CREDENTIALS) {
		super(message);
		this.name = ExceptionMessage.INVALID_CREDENTIALS;
	}
}

export { InvalidCredentialsError };
