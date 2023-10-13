import { UserDetailsResponseDto } from "./user.type"

type UserSignInResponseDto = {
  data: {
    user: UserDetailsResponseDto
    token: string
  }
}

export { type UserSignInResponseDto }
