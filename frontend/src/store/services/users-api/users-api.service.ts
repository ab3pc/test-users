import {
	AppRoute,
	ContentType,
	ENV,
	HttpMethod,
} from "../../../common/enums/enums";
import {
	UserDeleteRequestDto,
	UserDetailsResponseDto,
	UserUpdateResponseDto,
	UsersGetAllResponseDto,
} from "../../../common/enums/users/users";
import { UsersFilterOptions } from "../../../common/types/types";
import { TableParams } from "../../../components/users-table";
import { Http } from "../http/http.service";

type Constructor = {
	http: Http;
};

class UsersApi {
	#http: Http;

	public constructor({ http }: Constructor) {
		this.#http = http;
	}

	public getAll(
		queryString: UsersFilterOptions,
	): Promise<UsersGetAllResponseDto> {
		return this.#http.load(`${ENV.API_PATH}${AppRoute.USERS}`, {
			contentType: ContentType.JSON,
			queryString,
		});
	}

	public update(
		payload: UserDetailsResponseDto,
	): Promise<UserUpdateResponseDto> {
		return this.#http.load(`${ENV.API_PATH}${AppRoute.USERS}`, {
			method: HttpMethod.PATCH,
			contentType: ContentType.JSON,
			payload: JSON.stringify(payload),
		});
	}

	public delete(payload: UserDeleteRequestDto): Promise<UserUpdateResponseDto> {
		return this.#http.load(`${ENV.API_PATH}${AppRoute.USERS}`, {
			method: HttpMethod.DELETE,
			contentType: ContentType.JSON,
			payload: JSON.stringify(payload),
		});
	}
}

export { UsersApi };
