
import { Http } from '../http/http.service';
import { AuthApiPath, ContentType, ENV, HttpMethod } from '../../../common/enums/enums';
import { UserDetailsResponseDto, UserSignInRequestDto, UserSignInResponseDto, UserSignUpRequestDto, UserSignUpResponseDto } from '../../../common/enums/users/users';

type Constructor = {
  http: Http;
};

class AuthApi {
  #http: Http;

  public constructor({ http }: Constructor) {
    this.#http = http;

  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load(
      `${ENV.API_PATH}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load(
      `${ENV.API_PATH}${AuthApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public getCurrentUser(): Promise<UserDetailsResponseDto> {
    return this.#http.load(
      `${ENV.API_PATH}${AuthApiPath.CURRENT_USER}`,
      {
        contentType: ContentType.JSON,
      },
    );
  }
}

export { AuthApi };
