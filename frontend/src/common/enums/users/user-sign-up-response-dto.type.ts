import { UserDetailsResponseDto } from "./user.type";

type UserSignUpResponseDto = {
	data: {
		token: string;
		user: UserDetailsResponseDto;
	};
};

export { type UserSignUpResponseDto };
